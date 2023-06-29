import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Alert, Button, Label, TextInput, ToggleSwitch } from "flowbite-react";

import { createAnswer, deleteAnswer, updateAnswer } from "@api/exams/answers";

import type { CreateAnswerDto } from "../../api/exams/dto/answers.dto";
import { getOneQuestion } from "../../api/exams/questions";
import type { Answer } from "../../typing/api/exams/answers";

type Props = {
  answers: Answer[];
  questionId: string;
};
const AnswersList: React.FC<Props> = ({ answers, questionId }) => {
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
    deleteAnswer(id!)
      .then(() => setAnswers(_answers.filter((answer) => answer.id !== id)))
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleUpdate = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const answer = _answers.find((answer) => answer.id === id);
    if (!answer) return;
    if (!answer.title.length) return;
    const data = {
      title: answer.title,
      isCorrect: answer.isCorrect,
    };
    updateAnswer(id, data).catch(() => setError("Une erreur est survenue"));
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
      {_error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <p>{_error}</p>
        </Alert>
      )}
      {_answers.map((answer) => (
        <div key={answer.id}>
          <form key={answer.id} onSubmit={(e) => handleUpdate(e, answer.id)} className="w-full">
            <div className="flex gap-7">
              <TextInput
                minLength={1}
                maxLength={150}
                required
                value={answer.title}
                onChange={(e) => handleFormChange(answer.id, e.target.value)}
                className=" w-3/4"
              />
              <div>
                <ToggleSwitch checked={answer.isCorrect} value={""} onChange={(value) => handleFormChangeSwitch(answer.id, value)} label={""} />
              </div>
              <Button type="submit">
                <BiSave />
              </Button>
              <Button color="failure" onClick={() => handleDelete(answer.id)}>
                <MdDeleteOutline />
              </Button>
            </div>
          </form>
        </div>
      ))}
      <div className="flex justify-start items-end gap-11 mb-9">
        <div className="w-full">
          <Label>Ajouter une réponse</Label>
          <TextInput maxLength={150} minLength={1} required onChange={(e) => setTitle(e.target.value)} value={_title} />
          <Button onClick={handleCreate} className="w-full mt-2">
            <BiSave />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswersList;
