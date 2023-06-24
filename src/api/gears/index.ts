import type { Response } from "@typing/api/axios";

import { _get } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/gears";

export const index = (): Response<void> => {
  return _get(URL);
};
