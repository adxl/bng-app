import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Question } from "@typing/api/exams/questions";

import type { CreateQuestionDto, UpdateQuestionDto } from "./dto/questions.dto";

const URL = import.meta.env.VITE_API_URL + "/exams/attempts";

export const getOneQuestion = (id: string): Response<Question> => {
  return _get(URL + `${id}`);
};

export const createQuestion = (data: CreateQuestionDto): Response<void> => {
  return _post(URL, data);
};

export const updateQuestion = (id: string, data: UpdateQuestionDto): Response<void> => {
  return _patch(URL + `${id}`, data);
};

export const deleteQuestion = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
