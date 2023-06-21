import type { EntityReference } from "@typing/api/commons";

export type CreateVehicleDto = {
  type: EntityReference;

  year: number;

  station: EntityReference;
};

export type UpdateVehicleDto = {
  type?: EntityReference;

  year?: number;

  station?: EntityReference;

  active?: boolean;
};
