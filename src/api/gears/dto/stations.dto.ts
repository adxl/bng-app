export type CreateStationDto = {
  name: string;

  latitude: number;

  longitude: number;
};

export type UpdateStationDto = {
  name?: string;

  latitude?: number;

  longitude?: number;

  active?: boolean;

  eventId?: string;
};
