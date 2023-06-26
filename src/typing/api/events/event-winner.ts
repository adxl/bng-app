import type { Event } from "./events";

export type EventWinner = {
  event: Event;

  userId: string;

  rank: number;
};

export type SelfEventWinner = {
  firsts: string;

  seconds: string;

  thirds: string;

  caps: string;
};
