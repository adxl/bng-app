import type { EntityReference } from "@typing/api/commons";

export type CreateRideDto = {
  vehicle: EntityReference;

  userId: string;
};

export type UpdateRideInformationDto = {
  endStation: EntityReference;
};

export type UpdateRideReviewDto = {
  review: number;

  comment?: string;
};
