import { users, type User, type InsertUser, type ContactSubmission, type InsertContact } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  currentId: number;
  contactSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.currentId = 1;
    this.contactSubmissionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.contactSubmissionId++;
    const submittedAt = new Date();
    const contactSubmission: ContactSubmission = { 
      ...insertContact, 
      id, 
      submittedAt 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
}

export const storage = new MemStorage();
