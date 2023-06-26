import type { EventWinner } from "./event-winner";

export type Event = {
  id: string;

  name: string;

  startsAt: Date;

  endedAt: Date;

  stationId: string;

  winners: EventWinner[];
};
