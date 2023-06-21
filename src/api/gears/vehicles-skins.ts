import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { VehicleSkin } from "@typing/api/gears/vehicles-skins";

import type { CreateVehicleSkinDto, UpdateVehicleSkinDto } from "./dto/vehicles-skins.dto";

const URL = import.meta.env.VITE_API_URL + "gears/vehicles-skins";

export const getAllSkinss = (): Response<VehicleSkin[]> => {
  return _get(URL);
};

export const getOneSkins = (id: string): Response<VehicleSkin> => {
  return _get(URL + `/${id}`);
};

export const createSkins = (data: CreateVehicleSkinDto): Response<void> => {
  return _post(URL, data);
};

export const updateSkins = (id: string, data: UpdateVehicleSkinDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

// TODO: Upload file

export const deleteSkins = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
