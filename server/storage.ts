import { db } from "./db"; // Correct relative path
import { users, contactSubmissions, type User, type InsertUser, type ContactSubmission, type InsertContact } from "../shared/schema";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
}

export class PgStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0]; // Return first user or undefined
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0]; // Return first user or undefined
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user; // Return inserted user
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const submittedAt = new Date();
    // Using `contactSubmissions` table to insert
    const [contactSubmission] = await db.insert(contactSubmissions).values({
      ...insertContact,
      submittedAt
    }).returning();
    return contactSubmission; // Returning a single row (ContactSubmission type)
  }
}

// Export instance for usage
export const storage = new PgStorage();
