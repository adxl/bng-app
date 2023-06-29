import type { VehicleType } from "../gears/vehicles-types";

import type { Answer } from "./answers";
import type { Attempt } from "./attempts";
import type { Question } from "./questions";

export type Exam = {
  id: string;

  duration: number;

  typeId: string;

  type: VehicleType | undefined;

  questions: Question[];

  answers: Answer[];

  attempts: Attempt[];
};
