import React, { useEffect, useState } from "react";
import { BsHourglassSplit } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { HiInformationCircle, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Alert, Button, Card, Tabs } from "flowbite-react";

import { getAllExamsUser } from "../../api/exams/exams";
import { getAllTypes } from "../../api/gears/vehicles-types";
import type { Exam } from "../../typing/api/exams/exams";

const ExamsListUser: React.FC = () => {
  const { state } = useLocation();

  const [_examsPassed, setExamsPassed] = useState<Exam[]>([]);
  const [_examsNotPassed, setExamsNotPassed] = useState<Exam[]>([]);
  const [_error, setError] = useState<string>("");

  useEffect(() => {
    Promise.all([getAllExamsUser(), getAllTypes()]).then(([{ data: exams }, { data: types }]) => {
      exams.map((exam) => {
        exam.type = types.find((type) => type.id === exam.typeId);
      });
      setExamsPassed(exams.filter((exam) => exam.attempts));
      setExamsNotPassed(exams.filter((exam) => !exam.attempts));
    });

    if (state) {
      if (state.error) setError(state.error);
    }
  }, []);

  const fromMinutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h${remainingMinutes}` : `${remainingMinutes}min`;
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3500);
  }, [_error]);

  return (
    <>
      {_error && (
        <Alert color="failure" className="mb-5" icon={HiInformationCircle}>
          <p>{_error}</p>
        </Alert>
      )}
      <h1 className="text-5xl font-extrabold dark:text-white text-center w-full my-4">Mes permis</h1>
      <Tabs.Group aria-label="Default tabs" style="default" className="w-full justify-center">
        <Tabs.Item active icon={HiUserCircle} title="Permis validées">
          {_examsPassed.length ? (
            <div className="w-full flex flex-wrap gap-14 justify-center">
              {_examsPassed.map((exam) => (
                <Card key={exam.id} className=" w-1/4 border-emerald-500 border-2">
                  <div className="flex flex-col items-start">
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className=" text-start">{exam.type && "Exam de type : " + exam.type.name}</div>
                      <p className="text-green-500">{exam.attempts[0].score}%</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">Aucun permis validée</p>
          )}
        </Tabs.Item>
        <Tabs.Item icon={MdDashboard} title="Permis non validées">
          {_examsNotPassed.length ? (
            <div className="w-full flex flex-wrap gap-14 justify-center">
              {_examsNotPassed.map((exam) => (
                <Card key={exam.id} className=" w-1/4 border-rose-500 border-2">
                  <div className="flex flex-col items-start">
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className=" text-start">{exam.type && "Exam de type : " + exam.type.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>
                        <FaQuestion />
                      </strong>
                      <span>{exam.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>
                        <BsHourglassSplit />
                      </strong>
                      <span>{fromMinutesToHours(exam.duration)} </span>
                    </div>
                  </div>
                  <div className=" flex justify-end">
                    <Link to={`/licenses/launch/${exam.id}`}>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      <Button color="dark">Lancer l'exam</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">Aucune license validée</p>
          )}
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
};

export default ExamsListUser;
