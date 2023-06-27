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
};

export type UpdateStationEventDto = {
  eventId: string;
};

export type ManyStationsDto = {
  ids: string[];
};
