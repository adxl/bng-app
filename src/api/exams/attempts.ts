import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Attempt } from "@typing/api/exams/attempts";

import type { CreateAttemptDto, UpdateAttemptDto } from "./dto/attempts.dto";

type CreateResponse = {
  identifiers: [
    {
      id: string;
    }
  ];
  generatedMaps: [
    {
      id: string;
    }
  ];
  raw: [
    {
      id: string;
    }
  ];
};

const URL = import.meta.env.VITE_API_URL + "/exams/attempts";

export const getAllByType = (id: string): Response<Attempt[]> => {
  return _get(URL + `/type/${id}`);
};

export const getAllEnded = (): Response<Attempt[]> => {
  return _get(URL + `/allEnded`);
};

export const createAttempt = (data: CreateAttemptDto): Response<CreateResponse> => {
  return _post(URL, data);
};

export const updateAttempt = (id: string, data: UpdateAttemptDto): Response<Attempt> => {
  return _patch(URL + `/${id}`, data);
};
