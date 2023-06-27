import { _delete, _get, _patch, _post } from "@api/gateway";
import type { Response } from "@typing/api/axios";
import type { Exam } from "@typing/api/exams/exams";

import type { CreateExamDto, UpdateExamDto } from "./dto/exams.dto";

const URL = import.meta.env.VITE_API_URL + "/exams/exams";

export const getAllExams = (): Response<Exam[]> => {
  return _get(URL);
};

export const getAllExamsUser = (): Response<Exam[]> => {
  return _get(URL + "/user");
};

export const getOneExam = (id: string): Response<Exam> => {
  return _get(URL + `/${id}`);
};

export const createExam = (data: CreateExamDto): Response<void> => {
  return _post(URL, data);
};

export const updateExam = (id: string, data: UpdateExamDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const deleteExam = (id: string): Response<Exam> => {
  return _delete(URL + `/${id}`);
};
