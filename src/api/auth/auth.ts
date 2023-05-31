import type { Response } from "@typing/api";

import { _get, _post } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/auth";

// TODO: ADD USER RETURN TYPE
export const getCurrentUser = (token: string): Response<unknown> => {
  return _get(URL + "/me", token);
};

// TODO: ADD REGISTER RETURN TYPE
export const register = (name: string, email: string, password: string): Response<unknown> => {
  const data = { name, email, password };
  return _post(URL + "/register", data, null);
};

// TODO: ADD LOGIN RETURN TYPE
export const login = (email: string, password: string): Response<unknown> => {
  const data = { email, password };
  return _post(URL + "/login", data, null);
};
