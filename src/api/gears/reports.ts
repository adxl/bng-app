import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Report } from "@typing/api/gears/reports";

import type { CreateReportDto, UpdateReportDto } from "./dto/reports.dto";

const URL = import.meta.env.VITE_API_URL + "/gears/reports";

export const getReports = (): Response<Report[]> => {
  return _get(URL);
};

export const getOneReport = (id: string): Response<Report> => {
  return _get(URL + `/${id}`);
};

export const createReport = (data: CreateReportDto): Response<void> => {
  return _post(URL, data);
};

export const updateReport = (id: string, data: UpdateReportDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};
