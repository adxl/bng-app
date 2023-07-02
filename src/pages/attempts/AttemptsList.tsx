import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

import { findPublicUsersByIds } from "../../api/auth/user";
import { getAllEnded } from "../../api/exams/attempts";
import { getAllTypes } from "../../api/gears/vehicles-types";
import type { Attempt } from "../../typing/api/exams/attempts";

const AttemptsList: React.FC = () => {
  const [_attempts, setAttempts] = useState<Attempt[]>([]);

  const formatDate = (date: Date) => {
    date = new Date(date);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    Promise.all([getAllEnded(), getAllTypes()]).then(([{ data: attempts }, { data: types }]) => {
      findPublicUsersByIds({ ids: attempts.map((attempt) => attempt.userId) }).then(({ data: users }) => {
        setAttempts(
          attempts.map((attempt) => {
            return {
              ...attempt,
              exam: {
                ...attempt.exam,
                type: (attempt.exam.type = types.find((type) => type.id === attempt.exam.typeId)),
              },
              user: users.find((user) => user.id === attempt.userId),
            };
          })
        );
      });
    });
  }, []);

  return (
    <>
      <h1 className="text-5xl font-extrabold dark:text-white text-center w-full my-4">Candidats</h1>
      {_attempts.length > 0 ? (
        <div className=" w-full grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {_attempts.map((attempt) => (
            <Card key={attempt.id} className={attempt.score >= 80 ? "border-emerald-500" : " border-rose-500"}>
              <div className="flex flex-col justify-between text-left">
                <div className="flex justify-between">
                  <p className="text-2xl font-bold">{attempt.exam.type!.name}</p>
                  <p className="text-2xl font-bold">{attempt.score}%</p>
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {attempt.user!.firstName} {attempt.user!.lastName}{" "}
                  </p>
                  <p className="text-sm font-bold text-right text-gray-600">{formatDate(attempt.createdAt)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold dark:text-white text-center w-full my-4">Aucun candidat</h1>
        </div>
      )}
    </>
  );
};

export default AttemptsList;
