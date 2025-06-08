import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  reviewCount: integer("review_count").default(0),
  isVerified: boolean("is_verified").default(false),
  responseTime: text("response_time").default("< 1h"),
  profileImage: text("profile_image"),
});

export const missions = pgTable("missions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  location: text("location").notNull(),
  distance: text("distance").notNull(),
  payment: decimal("payment", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  urgency: text("urgency").notNull(),
  difficulty: text("difficulty").notNull(),
  tags: text("tags").array(),
  requirements: text("requirements").array(),
  deliverables: text("deliverables").array(),
  advantages: text("advantages").array(),
  clientId: integer("client_id").references(() => users.id),
  interestedCount: integer("interested_count").default(0),
  matchPercentage: integer("match_percentage").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const userInteractions = pgTable("user_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  missionId: integer("mission_id").references(() => missions.id),
  action: text("action").notNull(), // "accepted", "skipped", "saved"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  rating: true,
  reviewCount: true,
  isVerified: true,
  responseTime: true,
});

export const insertMissionSchema = createInsertSchema(missions).omit({
  id: true,
  interestedCount: true,
  matchPercentage: true,
  isActive: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertUserInteractionSchema = createInsertSchema(userInteractions).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type Mission = typeof missions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type UserInteraction = typeof userInteractions.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertUserInteraction = z.infer<typeof insertUserInteractionSchema>;
