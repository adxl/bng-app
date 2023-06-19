import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Question } from "@typing/api/exams/questions";

const URL = import.meta.env.VITE_API_URL + "/exams/attempts";

export const getOneQuestion = (id: string): Response<Question> => {
  return _get(URL + `${id}`);
};

export const createQuestion = (title: string, examId: string): Response<void> => {
  return _post(URL, { title, examId });
};

export const updateQuestion = (id: string, title: string): Response<void> => {
  return _patch(URL + `${id}`, { title });
};

export const deleteQuestion = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
