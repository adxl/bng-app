import type { User } from "@typing/api/auth/users";
import type { Response } from "@typing/api/axios";

import { _get, _post } from "../gateway";

import type { LoginDto, RegisterDto } from "./dto/auth.dto";

const URL = import.meta.env.VITE_API_URL + "/auth/account";

export const getCurrentUser = (): Response<User> => {
  return _get(URL + "/me");
};

export const register = (data: RegisterDto): Response<unknown> => {
  return _post(URL + "/register", data);
};

export const login = (data: LoginDto) => {
  return _post(URL + "/login", data);
};
