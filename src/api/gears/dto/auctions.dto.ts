import type { Vehicle } from "../../../typing/api/gears/vehicles";

export type CreateAuctionDto = {
  basePrice: number;

  vehicle: Vehicle;

  clickPrice: number;
};
