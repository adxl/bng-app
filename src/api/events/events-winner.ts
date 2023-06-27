import { _get, _patch } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { SelfEventWinner } from "@typing/api/events/event-winner";

import type { UpdateEventWinnersDto } from "./dto/eventsWinners.dto";

const URL = import.meta.env.VITE_API_URL + "/events/events-winners";

export const getSelfEventsWinner = (id: string): Response<SelfEventWinner> => {
  return _get(URL + `/user/${id}`);
};

export const updateEventWinners = (id: string, data: UpdateEventWinnersDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};
