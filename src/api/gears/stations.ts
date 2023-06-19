import type { Response } from "@typing/api/axios";
import type { Station } from "@typing/api/gears/stations";

import { _delete, _get, _patch, _post } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/gears/stations";

export const getAllStations = (): Response<Station[]> => {
  return _get(URL);
};

export const getOneStation = (id: string): Response<Station> => {
  return _get(URL + `/${id}`);
};

export const createStation = (name: string, longitude: number, latitude: number): Response<void> => {
  return _post(URL, { name, longitude, latitude });
};

export const updateStation = (
  id: string,
  name: string,
  longitude: number,
  latitude: number,
  active: boolean,
  eventId: string
): Response<void> => {
  return _patch(URL + `/${id}`, { name, longitude, latitude, active, eventId });
};

export const deleteStation = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
