import type { EntityReference } from "@typing/api/commons";

export type CreateVehicleSkinDto = {
  name: string;

  tier: number;

  type: EntityReference;

  image: string;
};

export type UpdateVehicleSkinDto = {
  name?: string;

  tier?: number;
};
