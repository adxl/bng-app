export type CreateAttemptDto = {
  examId: string;

  userId: string;
};

export type UpdateAttemptDto = {
  userAnswers?: UserAnswer[];
};

type UserAnswer = {
  questionId: string;

  answerId: string;
};
