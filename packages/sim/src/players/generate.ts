import { type Position } from "@dynasty-drive/shared";

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
