export type CreateVehicleDto = {
  type: string;

  year: number;

  station: string;
};

export type UpdateVehicleDto = {
  type?: string;

  year?: number;

  station?: string;

  active?: boolean;
};
