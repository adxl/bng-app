export type CreateEventDto = {
  name: string;

  startsAt: Date;

  stationId: string;
};

export type UpdateEventDto = {
  name?: string;

  endedAt?: Date;
};
