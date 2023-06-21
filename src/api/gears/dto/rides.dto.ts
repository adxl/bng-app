export type CreateRideDto = {
  vehicle: string;

  userId: string;
};

export type UpdateRideInformationDto = {
  endStation: string;
};

export type UpdateRideReviewDto = {
  review: number;

  comment?: string;
};
