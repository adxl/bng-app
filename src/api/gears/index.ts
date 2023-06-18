import type { Response } from "@typing/api/axios";
import type { Station } from "@typing/api/gears/stations";

import { _get } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/gears";

export const index = (): Response<void> => {
  return _get(URL);
};

export const getAllStations = (): Response<Station[]> => {
  return _get(URL + "/stations");
};
