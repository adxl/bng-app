import type { Response } from "@typing/api/axios";
import type { Station } from "@typing/api/gears/stations";

import { _delete, _get, _patch, _post } from "../gateway";

import type { CreateStationDto, ManyStationsDto, UpdateStationDto, UpdateStationEventDto } from "./dto/stations.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/stations";

export const getAllStations = (): Response<Station[]> => {
  return _get(URL);
};

export const getOneStation = (id: string): Response<Station> => {
  return _get(URL + `/${id}`);
};

export const createStation = (data: CreateStationDto): Response<void> => {
  return _post(URL, data);
};

export const updateStation = (id: string, data: UpdateStationDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const updateStationEvent = (id: string, data: UpdateStationEventDto): Response<void> => {
  return _patch(URL + `/${id}/event`, data);
};

export const deleteStation = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};

export const findStationByIds = (data: ManyStationsDto): Response<Station[]> => {
  return _post(URL + "/many", data);
};
