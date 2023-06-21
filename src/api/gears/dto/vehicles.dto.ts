import type { EntityReference } from "@typing/api/commons";

export type CreateVehicleDto = {
  year: number;
  type: EntityReference;
  station: EntityReference;
};

export type UpdateVehicleDto = {
  year?: number;
  type?: EntityReference;
  station?: EntityReference;
  active?: boolean;
};
