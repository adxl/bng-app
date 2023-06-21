import { _delete, _get, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { VehicleType } from "@typing/api/gears/vehicles-types";

import type { CreateVehicleTypeDto, UpdateVehicleTypeDto } from "./dto/vehicles-types.dto";

const URL = import.meta.env.VITE_API_URL + "gears/vehicles-types";

export const getAllTypes = (): Response<VehicleType[]> => {
  return _get(URL);
};

export const getOneType = (id: string): Response<VehicleType> => {
  return _get(URL + `/${id}`);
};

export const createType = (data: CreateVehicleTypeDto): Response<void> => {
  return _post(URL, data);
};

export const updateType = (id: string, data: UpdateVehicleTypeDto): Response<void> => {
  return _post(URL + `${id}`, data);
};

export const deleteType = (id: string): Response<void> => {
  return _delete(URL + `${id}`);
};
