import type { AxiosResponse } from "axios";
import axios from "axios";

type HttpHeaders = {
  "Content-Type": "application/json";
  "X-BNG-KEY": string;
  Authorization?: string;
};
type HttpBody = Record<string, unknown>;
type HttpResponse = Promise<AxiosResponse>;

function get_headers(token: string | null) {
  const headers: Partial<HttpHeaders> = {
    "Content-Type": "application/json",
    "X-BNG-KEY": "esgi",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  return headers;
}

export const _get = (url: string, token: string | null): HttpResponse => {
  const headers = get_headers(token);
  return axios.get(url, { headers });
};

export const _post = (url: string, body: HttpBody, token: string | null): HttpResponse => {
  const headers = get_headers(token);
  return axios.post(url, body, { headers });
};

export const _patch = (url: string, body: HttpBody, token: string | null): HttpResponse => {
  const headers = get_headers(token);
  return axios.patch(url, body, { headers });
};

export const _delete = (url: string, token: string | null): HttpResponse => {
  const headers = get_headers(token);
  return axios.delete(url, { headers });
};
