import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Ride } from "@typing/api/gears/rides";

import type { CreateRideDto, UpdateRideInformationDto, UpdateRideReviewDto } from "./dto/rides.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/rides";

export const getAllRides = (): Response<Ride[]> => {
  return _get(URL);
};

export const getOneRide = (id: string): Response<Ride> => {
  return _get(URL + `/${id}`);
};

export const createRide = (data: CreateRideDto): Response<void> => {
  return _post(URL, data);
};

export const endRide = (id: string, data: UpdateRideInformationDto): Response<void> => {
  return _patch(URL + `/${id}/info`, data);
};

export const reviewRide = (id: string, data: UpdateRideReviewDto): Response<void> => {
  return _patch(URL + `/${id}/review`, data);
};
