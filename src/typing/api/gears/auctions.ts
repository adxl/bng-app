import type { Vehicle } from "./vehicles";

export type Auction = {
  id: string;
  basePrice: number;
  clickPrice: number;
  vehicle: Vehicle;
  active: boolean;
  createdAt: Date;
  clicks: AuctionClick[];
};

export type AuctionClick = {
  id: string;
  userId: string;
  auction: Auction;
  timestamp: Date;
};
