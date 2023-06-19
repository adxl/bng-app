import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Report } from "@typing/api/gears/reports";

const URL = import.meta.env.VITE_API_URL + "/gears/reports";

export const getReports = (): Response<Report[]> => {
  return _get(URL);
};

export const getOneReport = (id: string): Response<Report> => {
  return _get(URL + `/${id}`);
};

export const createReport = (ride: string): Response<void> => {
  return _post(URL, { ride });
};

export const updateReport = (id: string, status: string): Response<void> => {
  return _patch(URL + `/${id}`, { status });
};
