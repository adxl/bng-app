import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Exam } from "@typing/api/exams/exams";

const URL = import.meta.env.VITE_API_URL + "/exams/exams";

export const getAllExams = (): Response<Exam[]> => {
  return _get(URL);
};

export const getOneExam = (id: string): Response<Exam> => {
  return _get(URL + `/${id}`);
};

export const createExam = (duration: number, typeId: string): Response<void> => {
  return _post(URL, { duration, typeId });
};

export const updateExam = (id: string, duration: number, typeId: string): Response<void> => {
  return _patch(URL + `/${id}`, { duration, typeId });
};

export const deleteExam = (id: string): Response<Exam> => {
  return _delete(URL + `/${id}`);
};
