export type CreateQuestionDto = {
  title: string;

  examId: string;
};

export type UpdateQuestionDto = {
  title?: string;
};
