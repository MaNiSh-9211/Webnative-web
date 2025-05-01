import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  filesystemAccess: boolean("filesystem_access").default(false).notNull(),
  commandAccess: boolean("command_access").default(false).notNull(),
  allowedPaths: text("allowed_paths"),
  allowedCommands: text("allowed_commands"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
  websites: many(websites)
}));

export const websitesRelations = relations(websites, ({ one }) => ({
  user: one(users, {
    fields: [websites.userId],
    references: [users.id]
  })
}));

export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.min(3, "Username must be at least 3 characters"),
  password: (schema) => schema.min(6, "Password must be at least 6 characters"),
}).omit({ 
  createdAt: true,
  updatedAt: true
});

export const insertWebsiteSchema = createInsertSchema(websites, {
  domain: (schema) => schema.min(3, "Domain must be at least 3 characters"),
}).omit({
  createdAt: true,
  updatedAt: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;
export type Website = typeof websites.$inferSelect;
