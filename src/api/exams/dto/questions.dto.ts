export type CreateQuestionDto = {
  title: string;

  exam: {
    id: string;
  };
};

export type UpdateQuestionDto = {
  title?: string;
};
