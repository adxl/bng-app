export type CreateVehicleSkinDto = {
  name: string;

  tier: number;

  type: string;

  image: string;
};

export type UpdateVehicleSkinDto = {
  name?: string;

  tier?: number;
};
