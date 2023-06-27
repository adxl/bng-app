import type { Response } from "@typing/api/axios";

import { _patch } from "../gateway";

import type { UpdateEventWinnersDto } from "./dto/eventsWinners.dto";

const URL = import.meta.env.VITE_API_URL + "/events/events-winners";

export const updateEventWinners = (id: string, data: UpdateEventWinnersDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};
