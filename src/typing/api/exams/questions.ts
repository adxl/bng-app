import type { Answer } from "./answers";
import type { Exam } from "./exams";

export type Question = {
  id: string;

  title: string;

  exam: Exam;

  answers: Answer[];
};
