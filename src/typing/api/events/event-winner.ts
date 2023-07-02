import type { User } from "../auth/users";

import type { Event } from "./events";

export type EventWinner = {
  event: Event;

  userId: string;
  user?: User | null;

  rank: number;
};

export type SelfEventWinner = {
  firsts: number;
  seconds: number;
  thirds: number;
  caps: number;
};
