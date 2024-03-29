import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Alert, Button, Label, TextInput, ToggleSwitch } from "flowbite-react";

import { createAnswer, deleteAnswer, updateAnswer } from "@api/exams/answers";

import type { CreateAnswerDto } from "../../api/exams/dto/answers.dto";
import { getOneQuestion } from "../../api/exams/questions";
import { useAuth } from "../../hooks/auth";
import { isInstructor } from "../../typing/api/auth/users";
import type { Answer } from "../../typing/api/exams/answers";

type Props = {
  answers: Answer[];
  questionId: string;
  reloadExam: () => void;
};

const AnswersList: React.FC<Props> = ({ answers, questionId, reloadExam }) => {
  const { user } = useAuth();
  const [_answers, setAnswers] = useState<Answer[]>(answers);
  const [_title, setTitle] = useState<string>("");
  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");

  const data: CreateAnswerDto = {
    title: _title,
    isCorrect: false,
    question: { id: questionId },
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
  }, [_error, _success]);

  const handleDelete = (id: string) => {
    deleteAnswer(id)
      .then(() => setAnswers(_answers.filter((answer) => answer.id !== id)))
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleUpdate = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const answer = _answers.find((answer) => answer.id === id);

    if (!answer) return;
    if (!answer.title.length) return;

    if (_answers.filter((a) => a.isCorrect).length !== 1) {
      return setError("Erreur: une seule bonne réponse par question");
    }

    const data = {
      title: answer.title,
      isCorrect: answer.isCorrect,
    };

    updateAnswer(id, data)
      .then(reloadExam)
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleCreate = () => {
    if (!_title.length) return;
    createAnswer(data)
      .then(() => {
        getOneQuestion(questionId).then(({ data }) => {
          setAnswers(data.answers);
          setTitle("");
        });
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleFormChange = (id: string, value: string) => {
    const data = _answers.map((answer) => {
      if (answer.id === id) {
        answer.title = value;
      }
      return answer;
    });
    setAnswers(data);
  };

  const handleFormChangeSwitch = (id: string, value: boolean) => {
    const data = _answers.map((answer) => {
      if (answer.id === id) {
        answer.isCorrect = value;
      }
      return answer;
    });
    setAnswers(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {isInstructor(user) && (
        <div>
          {_error && (
            <Alert color="failure" icon={HiInformationCircle}>
              <p>{_error}</p>
            </Alert>
          )}

          {_answers.filter((a) => a.isCorrect).length !== 1 && (
            <Alert color="failure" icon={HiInformationCircle}>
              <p>ATTENTION: Une seule réponse seulement doit être spécifiée comme étant la bonne réponse</p>
            </Alert>
          )}
        </div>
      )}

      {_answers.map((answer) => (
        <div key={answer.id}>
          {isInstructor(user) ? (
            <form key={answer.id} onSubmit={(e) => handleUpdate(e, answer.id)} className="w-full">
              <div className="md:flex md:gap-7">
                <div className="w-full flex flex-nowrap items-center gap-3">
                  <TextInput
                    minLength={1}
                    maxLength={150}
                    required
                    value={answer.title}
                    onChange={(e) => handleFormChange(answer.id, e.target.value)}
                    className="w-full"
                  />
                  <div>
                    <ToggleSwitch checked={answer.isCorrect} value="" onChange={(value) => handleFormChangeSwitch(answer.id, value)} label="" />
                  </div>
                </div>
                <div className="flex grid-cols-2 mt-1 md:mt-0 gap-1">
                  <Button className="w-full" gradientDuoTone="greenToBlue" type="submit">
                    <BiSave />
                  </Button>
                  <Button className="w-full" gradientDuoTone="pinkToOrange" onClick={() => handleDelete(answer.id)}>
                    <MdDeleteOutline />
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-base text-lg text-left text-gray-900 dark:text-white">{answer.title}</p>
          )}
        </div>
      ))}

      {isInstructor(user) && (
        <div className="flex justify-start items-end gap-11 mb-9">
          <div className="w-full">
            <Label>Ajouter une réponse</Label>
            <TextInput maxLength={150} minLength={1} required onChange={(e) => setTitle(e.target.value)} value={_title} />
            <Button gradientDuoTone="greenToBlue" onClick={handleCreate} className="w-full mt-2">
              <BiSave />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswersList;
