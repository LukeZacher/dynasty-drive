export type Rng = () => number;

export function createRng(seed: number): Rng {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randomChoice<T>(rng: Rng, items: readonly T[]): T {
  const index = Math.floor(rng() * items.length);
  return items[index]!;
}

export function randomNormal(rng: Rng, mean: number, stdDev: number): number {
  const u1 = 1 - rng();
  const u2 = rng();
  const magnitude = Math.sqrt(-2 * Math.log(u1));
  return mean + stdDev * magnitude * Math.cos(2 * Math.PI * u2);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
