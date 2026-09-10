import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config.js";

export const queryClient = postgres(config.DATABASE_URL);

export const db = drizzle(queryClient);
