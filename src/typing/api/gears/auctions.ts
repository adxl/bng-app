import type { Vehicle } from "./vehicles";

export type Auction = {
  id: string;
  basePrice: number;
  vehicle: Vehicle;
  active: boolean;
  createdAt: Date;

  // clicks
};
