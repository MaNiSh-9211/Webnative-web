import { db } from "@db";
import { users } from "@shared/schema";
import { eq, or, and, isNull } from "drizzle-orm";
import { InsertUser, User, UpsertUser } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";
import mongoose from "mongoose";

const PostgresSessionStore = connectPg(session);

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
  sessionStore: session.Store;
}

class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });

    return user;
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
