import type { Ride } from "./rides";
import type { Station } from "./stations";
import type { VehicleType } from "./vehicles-types";

export type Vehicle = {
  id: string;

  type: VehicleType;

  year: number;

  station: Station;

  rides: Ride[];

  active: boolean;

  createdAt: Date;
};
