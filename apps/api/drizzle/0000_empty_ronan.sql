CREATE TYPE "public"."position" AS ENUM('QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DE', 'DT', 'MLB', 'OLB', 'CB', 'FS', 'SS', 'K', 'P');--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"position" "position" NOT NULL,
	"age" integer NOT NULL,
	"speed" integer NOT NULL,
	"agility" integer NOT NULL,
	"strength" integer NOT NULL,
	"awareness" integer NOT NULL,
	"durability" integer NOT NULL,
	"potential" integer NOT NULL
);
