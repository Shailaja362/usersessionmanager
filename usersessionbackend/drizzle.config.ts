import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in environment variables.");
}

export default defineConfig({
  schema: "./src/db/**/*.ts", 
  out: "./drizzle",
   dialect: "postgresql", 
   dbCredentials: {
    url: process.env.DATABASE_URL,
  },
   migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
   verbose: true,
   strict: true,
});