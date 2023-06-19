import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Answer } from "@typing/api/exams/answers";

const URL = import.meta.env.VITE_API_URL + "/exams/answers";

export const getOneAnswer = (id: string): Response<Answer> => {
  return _get(URL + `/${id}`);
};

export const createAnswer = (title: string, isCorrect: boolean, questionId: string): Response<void> => {
  return _post(URL, { title, isCorrect, questionId });
};

export const updateAnswer = (id: string, title: string, isCorrect: boolean): Response<void> => {
  return _patch(URL + `/${id}`, { title, isCorrect });
};

export const deleteAnswer = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
