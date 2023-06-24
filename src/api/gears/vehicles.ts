import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Vehicle } from "@typing/api/gears/vehicles";

import type { CreateVehicleDto, UpdateVehicleDto } from "./dto/vehicles.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/vehicles";

export const getAllVehicles = (): Response<Vehicle[]> => {
  return _get(URL);
};

export const getOneVehicle = (id: string): Response<Vehicle> => {
  return _get(URL + `/${id}`);
};

export const createVehicle = (data: CreateVehicleDto): Response<void> => {
  return _post(URL, data);
};

export const updateVehicle = (id: string, data: UpdateVehicleDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const deleteVehicle = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
