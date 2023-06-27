import { _get } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { SelfEventWinner } from "@typing/api/events/event-winner";

const URL = import.meta.env.VITE_API_URL + "/events/events-winners";

export const getSelfEventsWinner = (id: string): Response<SelfEventWinner> => {
  return _get(URL + `/user/${id}`);
};
