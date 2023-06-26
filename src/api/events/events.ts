import { _get } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Event } from "@typing/api/events/events";

const URL = import.meta.env.VITE_API_URL + "/events/events";

export const getAllEvents = (): Response<Event[]> => {
  return _get(URL);
};
