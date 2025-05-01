import { db } from "@db";
import { insertUserSchema, users } from "@shared/schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";
import { type InsertUser, type User } from "@shared/schema";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser: (id: number) => Promise<User>;
  getUserByUsername: (username: string) => Promise<User | undefined>;
  createUser: (data: InsertUser) => Promise<User>;
  updateUser: (id: number, data: Partial<InsertUser>) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  sessionStore: session.SessionStore;
}

class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'user_sessions'
    });
  }

  async getUser(id: number): Promise<User> {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    
    if (!result) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await db.query.users.findFirst({
      where: eq(users.username, username)
    });
  }

  async createUser(data: InsertUser): Promise<User> {
    const validated = insertUserSchema.parse(data);
    const [user] = await db.insert(users).values(validated).returning();
    return user;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User> {
    const [updated] = await db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    
    if (!updated) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return updated;
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}

export const storage = new DatabaseStorage();
