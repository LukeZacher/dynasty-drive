import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { POSITIONS } from "@dynasty-drive/shared";

export const positionEnum = pgEnum("position", POSITIONS);

export const players = pgTable("players", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuidv7()`),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  position: positionEnum("position").notNull(),
  age: integer("age").notNull(),

  speed: integer("speed").notNull(),
  agility: integer("agility").notNull(),
  strength: integer("strength").notNull(),
  awareness: integer("awareness").notNull(),
  durability: integer("durability").notNull(),
  potential: integer("potential").notNull(),
});

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;
