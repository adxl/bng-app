import type { Response } from "@typing/api/axios";
import type { Station } from "@typing/api/gears/stations";

import { _delete, _get, _patch, _post } from "../gateway";

import type { CreateStationDto, UpdateStationDto } from "./dto/stations.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/stations";

export const getAllStations = (): Response<Station[]> => {
  return _get(URL);
};

export const getOneStation = (id: string): Response<Station> => {
  return _get(URL + `/${id}`);
};

// TODO: add DTO
export const createStation = (data: CreateStationDto): Response<void> => {
  return _post(URL, data);
};

// TODO: add DTO
export const updateStation = (id: string, data: UpdateStationDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const deleteStation = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
