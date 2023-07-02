import React, { useEffect, useState } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { HiEye, HiInformationCircle, HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import { createExam, getAllExams } from "@api/exams/exams";
import { getAllTypes } from "@api/gears/vehicles-types";
import { isInstructor } from "@typing/api/auth/users";
import type { Exam } from "@typing/api/exams/exams";

import { useAuth } from "../../hooks/auth";
import type { VehicleType } from "../../typing/api/gears/vehicles-types";

const ExamsList: React.FC = () => {
  const { user } = useAuth();

  const [_exams, setExams] = useState<Exam[]>([]);
  const [_duration, setDuration] = useState<number>(0);
  const [_type, setType] = useState<string>("");
  const [_types, setTypes] = useState<VehicleType[]>([]);
  const [_error, setError] = useState<string>("");

  const data = {
    duration: _duration,
    typeId: _type,
  };

  const refreshData = () => {
    getAllExams().then(({ data }) => setExams(data));
    Promise.all([getAllExams(), getAllTypes()]).then(([{ data: examsData }, { data: typesData }]) => {
      const exams = examsData.map((exam) => ({
        ...exam,
        type: typesData.find((type) => type.id === exam.typeId),
      }));

      const types = typesData.filter((type) => exams.find((exam) => exam.typeId === type.id) === undefined);
      if (types.length) setType(types[0].id);

      setTypes(types);
      setExams(exams);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [_error]);

  const fromMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h${remainingMinutes}` : `${remainingMinutes}min`;
  };

  const handleCreate = () => {
    createExam(data)
      .then(() => {
        refreshData();
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold dark:text-white text-center w-full my-4">EXAMENS</h1>
      {isInstructor(user) && (
        <div className="flex justify-center w-full">
          {_error && (
            <Alert color="failure" icon={HiInformationCircle}>
              <p>{_error}</p>
            </Alert>
          )}
        </div>
      )}
      <div className="w-full">
        {isInstructor(user) &&
          (_types.length > 0 ? (
            <div className="w-full justify-center">
              <div className="flex  my-9 justify-center w-50 items-end">
                <div>
                  <Label>Durée de l&apos;examen (en minutes)</Label>
                  <TextInput
                    type="number"
                    className="mr-4"
                    min={1}
                    required
                    onChange={(e) => setDuration(Number(e.currentTarget.value))}
                    value={_duration}
                  />
                </div>
                <div>
                  <Label>Type de l&apos;examen</Label>
                  {_types.length ? (
                    <Select required onChange={(e) => setType(e.target.value)} value={_type}>
                      {_types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    ""
                  )}
                </div>
                <Button gradientDuoTone="greenToBlue" onClick={handleCreate} className="ml-4">
                  Ajouter un exam
                 </Button>
              </div>
             
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <span className="text-lg">Tous les exams ont été crées</span>
            </div>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-10">
          {_exams.map((exam) => (
            <Card key={exam.id} className=" w-full">
              <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between gap-2">
                  <div className=" text-start">{exam.type && "Exam de type : " + exam.type.name}</div>
                  <div className=" flex justify-end">
                    {isInstructor(user) ? (
                    <Link to={`edit/${exam.id}`}>
                      <Button gradientDuoTone="greenToBlue">
                        <HiPencilSquare />
                      </Button>
                    </Link>
                    ) : (
                      <Link to={`${exam.id}`}>
                        <Button gradientDuoTone="greenToBlue">
                          <HiEye />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <strong>
                    <FaQuestion />
                  </strong>
                  <span>{exam.questions.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong>
                    <BsHourglassSplit />
                  </strong>
                  <span>{fromMinutesToHours(exam.duration)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExamsList;
