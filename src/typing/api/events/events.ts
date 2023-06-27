import type { Station } from "../gears/stations";

import type { EventWinner } from "./event-winner";

export type Event = {
  id: string;

  name: string;

  startsAt: Date;

  endedAt: Date;

  stationId: string;
  station?: Station | null;

  winners: EventWinner[];
};
