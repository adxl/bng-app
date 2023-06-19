import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { VehicleSkin } from "@typing/api/gears/vehicles-skins";

const URL = import.meta.env.VITE_API_URL + "gears/vehicles-skins";

export const getAllSkinss = (): Response<VehicleSkin[]> => {
  return _get(URL);
};

export const getOneSkins = (id: string): Response<VehicleSkin> => {
  return _get(URL + `/${id}`);
};

export const createSkins = (name: string, tier: number, type: string): Response<void> => {
  return _post(URL, { name, tier, type });
};

export const updateSkins = (id: string, name: string, tier: number, type: string): Response<void> => {
  return _patch(URL + `/${id}`, { name, tier, type });
};

export const deleteSkins = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
