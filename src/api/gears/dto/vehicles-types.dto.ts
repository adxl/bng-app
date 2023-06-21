export type CreateVehicleTypeDto = {
  name: string;

  capsMilestone: number;
};

export type UpdateVehicleTypeDto = {
  name?: string;

  capsMilestone?: number;
};
