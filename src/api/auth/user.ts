import { _delete, _get, _patch, _post } from "@api/gateway";
import type { User } from "@typing/api/auth/users";
import type { Response } from "@typing/api/axios";

import type { CreateDto, UpdatePasswordDto, UpdateProfileDto, UpdateRoleDto } from "./dto/users.dto";

const URL = import.meta.env.VITE_API_URL + "/auth/users";

export const getAllUsers = (): Response<User[]> => {
  return _get(URL);
};

export const getOneUser = (id: string): Response<User> => {
  return _get(URL + `/${id}`);
};

export const createUser = (data: CreateDto): Response<unknown> => {
  return _post(URL, data);
};

export const updatePassword = (id: string, data: UpdatePasswordDto): Response<void> => {
  return _patch(URL + `/${id}/password`, data);
};

export const updateProfile = (id: string, data: UpdateProfileDto): Response<void> => {
  return _patch(URL + `/${id}/profile`, data);
};

export const updateRole = (id: string, data: UpdateRoleDto): Response<void> => {
  return _patch(URL + `/${id}/role`, data);
};

export const deleteUser = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
