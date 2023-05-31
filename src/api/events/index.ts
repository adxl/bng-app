import type { Response } from "@typing/api";

import { _get } from "../gateway";

const URL = import.meta.env.VITE_API_URL + "/events";

export const index = (): Response<void> => {
  return _get(URL, null);
};
