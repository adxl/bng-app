import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Label, Progress, TextInput } from "flowbite-react";

import { getAllExamsUser, getOneExamPublic } from "@api/exams/exams";

import { createAttempt, updateAttempt } from "../../api/exams/attempts";
import { getOneType } from "../../api/gears/vehicles-types";
import { useAuth } from "../../hooks/auth";
import type { UserAnswer } from "../../typing/api/exams/attempts";
import type { Exam } from "../../typing/api/exams/exams";
const ExamsLaunch: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [_exam, setExam] = useState<Exam | null>(null);
  const [_attemptId, setAttemptId] = useState<string>("");
  const [_progressBar, setProgressBar] = useState<number>(100);
  const formData = useRef<HTMLFormElement>(null);

  const fromMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours > 0 ? `${hours}h` : "";
    const minutesString = remainingMinutes > 0 ? `${remainingMinutes}min` : "";
    return `${hoursString}${minutesString}`;
  };

  const launchTimer = (duration: number) => {
    const startDate = new Date().toISOString();
    const endDate = new Date(new Date().getTime() + duration * 60000).toISOString();
    const durationInSec = duration * 60;
    const remainingTimeInMs = new Date(endDate).getTime() - new Date(startDate).getTime();

    const timer = setInterval(() => {
      setProgressBar((prev) => prev - 100 / durationInSec);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      navigate("/licenses");
    }, remainingTimeInMs);
  };

  useEffect(() => {
    getOneExamPublic(id!)
      .then(({ data: exam }) => {
        if (!exam) navigate("/licenses");

        Promise.all([getOneType(exam.typeId), getAllExamsUser()])
          .then(([{ data: type }, { data: allExams }]) => {
            const examUser = allExams.find((e) => e.id === id);
            if (examUser?.attempts?.length) navigate("/licenses");

            const oneExam = { ...exam, type };

            createAttempt({ exam: { id: id! }, userId: user.id ?? "" }).then(({ data: attempt }) => {
              setAttemptId(attempt.identifiers[0].id);
              launchTimer(exam.duration);
            });

            setExam(oneExam);
          })
          .catch((_) => {
            navigate("/licenses");
          });
      })
      .catch((_) => {
        navigate("/licenses");
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = formData.current;
    if (!form) return;

    const answers: UserAnswer[] = _exam!.questions.map((question) => {
      const answerId = String(form["question-" + question.id].value);
      return { questionId: question.id, answerId };
    });

    let error: string | null = null;

    if (answers.some((answer) => !answer.answerId)) {
      error = "Veuillez répondre à toutes les questions";
    }

    updateAttempt(_attemptId, { userAnswers: answers })
      .then(({ data: attempt }) => {
        navigate("/licenses/launch/" + id + "/result", {
          state: { typeExam: _exam?.type?.name || "", score: attempt.score, isSuccess: attempt.score >= 80, endedAt: attempt.endedAt },
        });
      })
      .catch((_) => {
        navigate("/licenses", { state: { error: error ?? "Une erreur est survenue" } });
      });
  };

  return (
    <>
      {_exam && (
        <div className="w-full">
          <Progress color="indigo" progress={_progressBar} />
          <div className="md:flex justify-between my-10">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h4 className="text-4xl font-bold dark:text-white text-left mb-4 ">Type de l'examen : {_exam.type?.name} </h4>
            <div className="flex justify-between items-center gap-5">
              <h4 className="text-2xl font-bold dark:text-white w-1/2">Durée</h4>
              <h4 className="text-2xl font-bold dark:text-white w-1/2">{fromMinutesToHours(_exam.duration)}</h4>
            </div>
          </div>
          <form className="flex flex-col gap-8 w-full" ref={formData} onSubmit={handleSubmit}>
            {_exam.questions.map((question) => (
              <Card key={question.id} className="w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex gap-7">
                    <h4 className="text-2xl font-bold dark:text-white text-left mb-4">{question.title}</h4>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <TextInput type="hidden" name="questionId" value={question.id}></TextInput>
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="flex items-center mb-4">
                        <TextInput
                          id={"answer-" + answer.id}
                          type="radio"
                          value={answer.id}
                          name={"question-" + question.id}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Label htmlFor={"answer-" + answer.id} className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {answer.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            <Button type="submit">Valider</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ExamsLaunch;
