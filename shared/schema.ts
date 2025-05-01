import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);

export type UpsertUser = typeof users.$inferInsert;

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  allowFileAccess: boolean("allow_file_access").default(true).notNull(),
  allowCommandExecution: boolean("allow_command_execution").default(false).notNull(),
  notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const websitePermissions = pgTable("website_permissions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  websiteUrl: text("website_url").notNull(),
  allowFileAccess: boolean("allow_file_access").default(false).notNull(),
  allowCommandExecution: boolean("allow_command_execution").default(false).notNull(),
  allowedPaths: text("allowed_paths"),
  blockedPaths: text("blocked_paths"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  settings: many(userSettings),
  websitePermissions: many(websitePermissions),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const websitePermissionsRelations = relations(websitePermissions, ({ one }) => ({
  user: one(users, {
    fields: [websitePermissions.userId],
    references: [users.id],
  }),
}));

// Create validation schemas
export const insertUserSettingsSchema = createInsertSchema(userSettings);
export const insertWebsitePermissionsSchema = createInsertSchema(websitePermissions);

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserSettings = typeof userSettings.$inferSelect;
export type WebsitePermissions = typeof websitePermissions.$inferSelect;
