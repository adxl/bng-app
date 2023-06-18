import type { Report } from "./reports";
import type { Station } from "./stations";
import type { Vehicle } from "./vehicles";
import type { VehicleSkin } from "./vehicles-skins";

export type Ride = {
  id: string;

  vehicle: Vehicle;

  skin: VehicleSkin;

  startStation: Station;

  endStation: Station | null;

  report: Report;

  userId: string;

  createdAt: Date;

  endedAt: Date | null;

  review: number | null;

  comment: string | null;
};
