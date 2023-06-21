import type { Ride } from "./rides";

export enum ReportStatus {
  OPEN = "Ouvert",
  IN_PROGRESS = "En cours",
  DONE = "Terminé",
}

export type Report = {
  id: string;
  ride: Ride;
  status: ReportStatus;
  createdAt: Date;
};
