import { _delete, _get, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { VehicleType } from "@typing/api/gears/vehicles-types";

const URL = import.meta.env.VITE_API_URL + "gears/vehicles-types";

export const getAllTypes = (): Response<VehicleType[]> => {
  return _get(URL);
};

export const getOneType = (id: string): Response<VehicleType> => {
  return _get(URL + `/${id}`);
};

export const createType = (name: string, capsMilestone: number): Response<void> => {
  return _post(URL, { name, capsMilestone });
};

export const updateType = (id: string, name: string, capsMilestone: number): Response<void> => {
  return _post(URL + `${id}`, { name, capsMilestone });
};

export const deleteType = (id: string): Response<void> => {
  return _delete(URL + `${id}`);
};
