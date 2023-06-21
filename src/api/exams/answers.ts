import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Answer } from "@typing/api/exams/answers";

import type { CreateAnswerDto, UpdateAnswerDto } from "./dto/answers.dto";

const URL = import.meta.env.VITE_API_URL + "/exams/answers";

export const getOneAnswer = (id: string): Response<Answer> => {
  return _get(URL + `/${id}`);
};

export const createAnswer = (data: CreateAnswerDto): Response<void> => {
  return _post(URL, data);
};

export const updateAnswer = (id: string, data: UpdateAnswerDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const deleteAnswer = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
