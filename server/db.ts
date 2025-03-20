import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// Connect to the database
const connection = postgres(process.env.DATABASE_URL, {
    ssl: { rejectUnauthorized: false }, // Enable SSL for production
});

export const db = drizzle(connection, { schema });
