import type { ReportStatus } from "@typing/api/gears/reports";
import type { Ride } from "@typing/api/gears/rides";

export type CreateReportDto = {
  ride: Ride;
};

export type UpdateReportDto = {
  status?: ReportStatus;
  active?: boolean;
};
