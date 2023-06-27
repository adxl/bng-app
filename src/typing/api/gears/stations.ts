import type { Vehicle } from "./vehicles";

export type Station = {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  eventId: string;

  vehicles: Vehicle[];

  active: boolean;

  createdAt: Date;
};
