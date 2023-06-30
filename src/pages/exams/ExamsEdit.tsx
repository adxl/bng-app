import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";

import { deleteExam, getOneExam, updateExam } from "@api/exams/exams";
import { createQuestion, deleteQuestion, updateQuestion } from "@api/exams/questions";
import { getOneType } from "@api/gears/vehicles-types";

import AnswersList from "../../components/exams/AnswersList";
import type { Question } from "../../typing/api/exams/questions";

const ExamsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [_duration, setDuration] = useState<number>(0);
  const [_questions, setQuestions] = useState<Question[]>([]);
  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");
  const [_questionTitle, setQuestionTitle] = useState<string>("");
  const [_name, setName] = useState<string>("");

  const data = {
    duration: _duration,
  };

  const question = {
    title: _questionTitle,
    exam: { id: id! },
  };

  const reloadExam = () => {
    getOneExam(id!).then(({ data }) => {
      setDuration(data.duration);
      setQuestions(data.questions);
      getOneType(data.typeId).then(({ data }) => {
        setName(data.name);
      });
    });
  };

  useEffect(() => {
    reloadExam();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
  }, [_error, _success]);

  const handleDelete = () => {
    deleteExam(id!)
      .then(() => {
        navigate("/admin/exams");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleDeleteQuestion = (id: string) => {
    deleteQuestion(id!)
      .then(() => {
        setQuestions(_questions.filter((question) => question.id !== id));
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleUpdate = () => {
    updateExam(id!, data)
      .then(() => setSuccess("Modification réussie"))
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleSubmitQuestion = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const question = _questions.find((question) => question.id === id);
    if (!question) return;
    const data = {
      title: question.title,
    };
    updateQuestion(id, data)
      .then(() => setSuccess("Modification réussie"))
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleFormChangeQuestion = (id: string, value: string) => {
    const data = _questions.map((question) => {
      if (question.id === id) {
        question.title = value;
      }
      return question;
    });
    setQuestions(data);
  };

  const handleCreateQuestion = () => {
    if (_questionTitle.length < 1) return;

    createQuestion(question)
      .then(() => {
        getOneExam(id!).then(({ data }) => {
          setQuestions(data.questions);
          setQuestionTitle("");
          setSuccess("La question a bien été ajoutée");
        });
      })
      .catch(() => setError("Une erreur est survenue"));
  };
  return (
    <div className="w-full">
      <div className="flex justify-between mb-10">
        <Link to="/admin/exams">
          <Button gradientDuoTone="greenToBlue">Retour</Button>
        </Link>
        <Button gradientDuoTone="pinkToOrange" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>

      <div>
        {_success && (
          <Alert color="success" icon={HiInformationCircle}>
            <p>{_success}</p>
          </Alert>
        )}
        {_error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <p>{_error}</p>
          </Alert>
        )}
      </div>

      <div className="md:flex justify-between my-10">
        <h4 className="text-4xl font-bold dark:text-white text-left mb-4 ">Type de l&apos;examen : {_name}</h4>
        <div className="flex justify-between items-center gap-5">
          <h4 className="text-2xl font-bold dark:text-white w-1/2">Durée</h4>
          <TextInput min="1" required type="number" value={_duration} onChange={(e) => setDuration(Number(e.target.value))} />
          <Button gradientDuoTone="greenToBlue" onClick={handleUpdate}>
            <BiSave />
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-end gap-11 mb-9">
        <div className="w-full">
          <Label>Ajouter une question</Label>
          <TextInput maxLength={150} minLength={1} required onChange={(e) => setQuestionTitle(e.target.value)} value={_questionTitle} />
          <Button gradientDuoTone="greenToBlue" onClick={handleCreateQuestion} className="w-full mt-2">
            <BiSave />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        {_questions.map((question, index) => (
          <Card key={question.id} className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <h4 className="text-2xl font-bold dark:text-white text-left mb-4 mt-6">Question {index + 1}</h4>
              <form onSubmit={(e) => handleSubmitQuestion(e, question.id)} className="w-full">
                <div className="md:flex md:gap-7">
                  <TextInput
                    required
                    value={question.title}
                    minLength={1}
                    maxLength={150}
                    onChange={(e) => handleFormChangeQuestion(question.id, e.target.value)}
                    className="w-full md:w-3/4"
                  />
                  <div className="flex grid-col-2 mt-1 md:mt-0 gap-1">
                    <Button className="w-full" gradientDuoTone="greenToBlue" type="submit">
                      <BiSave />
                    </Button>
                    <Button className="w-full" gradientDuoTone="pinkToOrange" onClick={() => handleDeleteQuestion(question.id)}>
                      <MdDeleteOutline />
                    </Button>
                  </div>
                </div>
              </form>

              <h4 className="text-2xl font-bold dark:text-white text-left mb-4 mt-6">Réponses</h4>
              <AnswersList questionId={question.id} answers={question.answers} reloadExam={reloadExam} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamsEdit;
