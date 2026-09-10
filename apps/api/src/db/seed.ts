import { createRng, generatePlayers } from "@dynasty-drive/sim";
import { db, queryClient } from "./index.js";
import { players } from "./schema.js";

const SEED = 12345;
const PLAYER_COUNT = 250;

async function seed() {
  console.log("Seeding database...");

  await db.delete(players);
  console.log("Cleared existing players");

  const rng = createRng(SEED);
  const generated = generatePlayers(rng, PLAYER_COUNT);

  await db.insert(players).values(generated);
  console.log(`Inserted ${generated.length} players`);
}

seed()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await queryClient.end();
  });
