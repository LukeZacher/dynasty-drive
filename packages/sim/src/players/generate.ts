import { clamp, randomChoice, randomInt, randomNormal, type Rng } from "../random.js";
import { FIRST_NAMES, LAST_NAMES } from "../data/names.js";
import { POSITIONS, type Position } from "@dynasty-drive/shared";

export type GeneratedPlayer = {
  firstName: string;
  lastName: string;
  position: Position;
  age: number;

  speed: number;
  agility: number;
  strength: number;
  awareness: number;
  durability: number;
  potential: number;
};

const MIN_RATING = 40;
const MAX_RATING = 99;

function generateAttribute(rng: Rng, mean: number, stdDev: number): number {
  return Math.round(clamp(randomNormal(rng, mean, stdDev), MIN_RATING, MAX_RATING));
}

export function generatePlayer(rng: Rng): GeneratedPlayer {
  const age = clamp(Math.round(randomNormal(rng, 25, 3.5)), 21, 38);

  const speed = generateAttribute(rng, 70, 12);
  const agility = generateAttribute(rng, 70, 12);
  const strength = generateAttribute(rng, 70, 12);
  const awareness = generateAttribute(rng, 70, 12);
  const durability = generateAttribute(rng, 75, 10);

  const currentPeak = Math.max(speed, agility, strength, awareness);
  const yearsOfGrowth = Math.max(0, 27 - age);
  const growthCeiling = randomInt(rng, 0, yearsOfGrowth * 2);
  const potential = clamp(currentPeak + growthCeiling, MIN_RATING, MAX_RATING);

  return {
    firstName: randomChoice(rng, FIRST_NAMES),
    lastName: randomChoice(rng, LAST_NAMES),
    position: randomChoice(rng, POSITIONS),
    age,
    speed,
    agility,
    strength,
    awareness,
    durability,
    potential,
  };
}

export function generatePlayers(rng: Rng, count: number): GeneratedPlayer[] {
  return Array.from({ length: count }, () => generatePlayer(rng));
}
