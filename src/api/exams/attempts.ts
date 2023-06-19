import { _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Attempt, UserAnswer } from "@typing/api/exams/attempts";

const URL = import.meta.env.VITE_API_URL + "/exams/attempts";

export const getAllByType = (id: string): Response<Attempt[]> => {
  return _get(URL + `/type/${id}`);
};

export const getOneAttempt = (id: string): Response<Attempt> => {
  return _get(URL + `/${id}`);
};

export const createAttempt = (examId: string, userId: string): Response<void> => {
  return _post(URL, { examId, userId });
};

export const updateAttempt = (id: string, userAnswers: UserAnswer[]): Response<void> => {
  return _patch(URL + `/${id}`, { userAnswers });
};
