import type { Exam } from "./exams";

export type Attempt = {
  id: string;

  userId: string;

  exam: Exam;

  score: number;

  createdAt: Date;

  endedAt: Date;
};

export type UserAnswer = {
  questionId: string;

  answerId: string;
};
