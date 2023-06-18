import type { Response } from "@typing/api/axios";
import type { User } from "@typing/api/users";

import { _get, _post } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/auth/account";

// TODO: ADD USER RETURN TYPE
export const getCurrentUser = (): Response<User> => {
  return _get(URL + "/me");
};

// TODO: ADD REGISTER RETURN TYPE
export const register = (name: string, email: string, password: string): Response<unknown> => {
  const data = { name, email, password };
  return _post(URL + "/register", data);
};

// TODO: ADD LOGIN RETURN TYPE
export const login = (email: string, password: string): Response<unknown> => {
  const data = { email, password };
  return _post(URL + "/login", data);
};
