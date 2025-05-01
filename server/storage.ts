import { db } from "@db";
import { users } from "@shared/schema";
import { eq, or, and, isNull } from "drizzle-orm";
import { InsertUser, User, UpsertUser } from "@shared/schema";
import { pool } from "@db";
import mongoose from "mongoose";

// Define the OAuth user data interface
interface OAuthUserData {
  providerId: string;
  provider: string;
  email?: string;
  username: string;
  displayName?: string;
  profilePicture?: string;
}

interface IStorage {
  createUser(user: Partial<InsertUser>): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByProviderId(providerId: string, provider: string): Promise<User | undefined>;
  findOrCreateOAuthUser(userData: OAuthUserData): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize mongoose connection for MongoDB
    const dbUri = process.env.MONGODB_URI || 'mongodb+srv://USER:PASSWORD@cluster.mongodb.net/webnative?retryWrites=true&w=majority';
    mongoose.connect(dbUri);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });

    return user;
  }
  
  async getUserByProviderId(providerId: string, provider: string): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: and(
        eq(users.providerId, providerId),
        eq(users.provider, provider)
      )
    });
    
    return user;
  }
  
  async findOrCreateOAuthUser(userData: OAuthUserData): Promise<User> {
    // First try to find user by provider ID
    let user = await this.getUserByProviderId(userData.providerId, userData.provider);
    
    // If not found, try by email if provided
    if (!user && userData.email) {
      user = await this.getUserByEmail(userData.email);
    }
    
    // If user exists, update provider info
    if (user) {
      const [updatedUser] = await db.update(users)
        .set({
          provider: userData.provider,
          providerId: userData.providerId,
          displayName: userData.displayName || user.displayName,
          profilePicture: userData.profilePicture || user.profilePicture,
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id))
        .returning();
      
      return updatedUser;
    }
    
    // Create new user if not found
    const username = await this.generateUniqueUsername(userData.username);
    
    const [newUser] = await db.insert(users)
      .values({
        username,
        email: userData.email,
        displayName: userData.displayName,
        profilePicture: userData.profilePicture,
        provider: userData.provider,
        providerId: userData.providerId,
      })
      .returning();
    
    return newUser;
  }
  
  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username)
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email) return undefined;
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    return user;
  }

  // Helper method to generate a unique username
  private async generateUniqueUsername(baseUsername: string): Promise<string> {
    // Remove spaces and special characters
    let username = baseUsername.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if username exists
    let user = await this.getUserByUsername(username);
    let counter = 1;
    
    // If username exists, append a number
    while (user) {
      username = `${baseUsername.toLowerCase().replace(/[^a-z0-9]/g, '')}${counter}`;
      user = await this.getUserByUsername(username);
      counter++;
    }
    
    return username;
  }
}

export const storage = new DatabaseStorage();
