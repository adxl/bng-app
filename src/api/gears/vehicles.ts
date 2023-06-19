import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Vehicle } from "@typing/api/gears/vehicles";

const URL = import.meta.env.VITE_API_URL + "gears/vehicles";

export const getAllVehicles = (): Response<Vehicle[]> => {
  return _get(URL);
};

export const getOneVehicle = (id: string): Response<Vehicle> => {
  return _get(URL + `/${id}`);
};

export const createVehicle = (type: string, year: number, station: string): Response<void> => {
  return _post(URL, { type, year, station });
};

export const updateVehicle = (
  id: string,
  type: string,
  year: number,
  station: string,
  active: boolean
): Response<void> => {
  return _patch(URL + `/${id}`, { type, year, station, active });
};

export const deleteVehicle = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
