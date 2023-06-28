import type { Ride } from "./rides";

export const OPEN = "Ouvert";
export const IN_PROGRESS = "En cours";
export const DONE = "Terminé";

export type ReportStatus = typeof OPEN | typeof IN_PROGRESS | typeof DONE;

export const ReportStatusList: ReportStatus[] = [OPEN, IN_PROGRESS, DONE];
export type Report = {
  id: string;
  ride: Ride;
  status: ReportStatus;
  createdAt: Date;
};
