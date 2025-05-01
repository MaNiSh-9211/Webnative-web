import { db } from "@db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { InsertUser, User } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";
import { and, or, isNull } from "drizzle-orm";

const PostgresSessionStore = connectPg(session);

interface IStorage {
  createUser(user: Partial<InsertUser>): Promise<User>;
  getUser(id: number): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByGithubId(githubId: string): Promise<User | undefined>;
  findOrCreateOAuthUser(profile: any, provider: 'google' | 'github'): Promise<User>;
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

  async getUser(id: number): Promise<User> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

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

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    if (!googleId) return undefined;
    
    const user = await db.query.users.findFirst({
      where: eq(users.googleId, googleId)
    });

    return user;
  }

  async getUserByGithubId(githubId: string): Promise<User | undefined> {
    if (!githubId) return undefined;
    
    const user = await db.query.users.findFirst({
      where: eq(users.githubId, githubId)
    });

    return user;
  }

  async findOrCreateOAuthUser(profile: any, provider: 'google' | 'github'): Promise<User> {
    let user: User | undefined;
    
    // First check if user exists by provider ID
    if (provider === 'google') {
      user = await this.getUserByGoogleId(profile.id);
    } else if (provider === 'github') {
      user = await this.getUserByGithubId(profile.id);
    }
    
    // If user not found by provider ID, try email
    if (!user && profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      user = await this.getUserByEmail(email);
    }
    
    // If user still not found, create a new user
    if (!user) {
      const username = await this.generateUniqueUsername(profile.displayName || profile.username || 'user');
      
      const userData = {
        username,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
        displayName: profile.displayName || null,
        profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
      } as any; // Use type assertion to avoid TypeScript errors
      
      // Set the provider-specific ID
      if (provider === 'google') {
        userData.googleId = profile.id;
      } else if (provider === 'github') {
        userData.githubId = profile.id;
      }
      
      const [newUser] = await db.insert(users).values(userData).returning();
      return newUser;
    }
    
    // If user exists but doesn't have the provider ID set, update the user
    if ((provider === 'google' && !user.googleId) || (provider === 'github' && !user.githubId)) {
      const updateData: Partial<User> = {};
      
      if (provider === 'google') {
        updateData.googleId = profile.id;
      } else if (provider === 'github') {
        updateData.githubId = profile.id;
      }
      
      // Update the user profile picture if it's not set
      if (!user.profilePicture && profile.photos && profile.photos.length > 0) {
        updateData.profilePicture = profile.photos[0].value;
      }
      
      // Update if there are fields to update
      if (Object.keys(updateData).length > 0) {
        const [updatedUser] = await db
          .update(users)
          .set({
            ...updateData,
            updatedAt: new Date(),
          })
          .where(eq(users.id, user.id))
          .returning();
        
        return updatedUser;
      }
    }
    
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
