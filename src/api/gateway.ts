import type { AxiosResponse } from "axios";
import axios from "axios";

type HttpHeaders = {
  "Content-Type": "application/json";
  "X-BNG-KEY": string;
  Authorization?: string;
};
type HttpBody = Record<string, unknown>;
type HttpResponse = Promise<AxiosResponse>;

function get_headers() {
  const headers: Partial<HttpHeaders> = {
    "Content-Type": "application/json",
    "X-BNG-KEY": "esgi",
  };

  const token = sessionStorage.getItem("bng-token");
  if (token) {
    headers["Authorization"] = token;
  }

  return headers;
}

export const _get = (url: string): HttpResponse => {
  const headers = get_headers();
  return axios.get(url, { headers });
};

export const _post = (url: string, body: HttpBody): HttpResponse => {
  const headers = get_headers();
  return axios.post(url, body, { headers });
};

export const _patch = (url: string, body: HttpBody): HttpResponse => {
  const headers = get_headers();
  return axios.patch(url, body, { headers });
};

export const _delete = (url: string): HttpResponse => {
  const headers = get_headers();
  return axios.delete(url, { headers });
};
