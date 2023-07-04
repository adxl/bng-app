import { _get, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";

import type { Auction } from "../../typing/api/gears/auctions";

import type { CreateAuctionDto } from "./dto/auctions.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/auctions/";

export const getActive = (): Response<Auction> => {
  return _get(URL);
};

export const createAuction = (data: CreateAuctionDto): Response<void> => {
  return _post(URL, data);
};
