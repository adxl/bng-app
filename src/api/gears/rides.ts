import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Ride } from "@typing/api/gears/rides";

const URL = import.meta.env.VITE_API_URL + "/gears/rides";

export const getAllRides = (): Response<Ride[]> => {
  return _get(URL);
};

export const getOneRide = (id: string): Response<Ride> => {
  return _get(URL + `/${id}`);
};

export const createRide = (vehicle: string, userId: string): Response<void> => {
  return _post(URL, { vehicle, userId });
};

export const endRide = (id: string, endStation: string): Response<void> => {
  return _patch(URL + `/${id}/info`, { endStation });
};

export const reviewRide = (id: string, review: number, comment: string): Response<void> => {
  return _patch(URL + `/${id}/review`, { review, comment });
};
