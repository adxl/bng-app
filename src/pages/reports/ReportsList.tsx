import React, { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { TbJetpack } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";

import { getReports } from "@api/gears/reports";
import { useAuth } from "@hooks/auth";
import { isTechnician } from "@typing/api/auth/users";
import type { Report } from "@typing/api/gears/reports";

const ReportsList: React.FC = () => {
  const { user } = useAuth();
  const [_reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    getReports().then(({ data }) => {
      setReports(data);
    });
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
        {_reports
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((report) => (
            <Card key={report.id}>
              <div className="flex flex-col items-start">
                {!report.ride.vehicle.active && (
                  <Badge color="red" size="sm" className="ml-3 mb-3">
                    En suspension
                  </Badge>
                )}
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex align-center">
                    <p className="whitespace-nowrap font-bold md:hidden">
                      {new Date(report.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                      {new Date(report.createdAt).toLocaleTimeString("fr-FR")}
                    </p>
                    <p className="font-bold hidden md:block">
                      Rapport du : {new Date(report.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                      {new Date(report.createdAt).toLocaleTimeString("fr-FR")}
                    </p>
                    {report.status === "Ouvert" ? (
                      <Badge color="green" size="sm" className="ml-3">
                        Ouvert
                      </Badge>
                    ) : report.status === "Terminé" ? (
                      <Badge color="red" size="sm" className="ml-3">
                        Terminé
                      </Badge>
                    ) : (
                      <Badge color="warning" size="sm" className="ml-3">
                        En cours
                      </Badge>
                    )}
                  </div>
                  {report.status !== "Terminé" && (
                    <div className=" flex justify-end">
                      {isTechnician(user) && (
                        <Link to={`edit/${report.id}`}>
                          <Button gradientDuoTone="greenToBlue">
                            <HiPencilSquare />
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex  items-start mt-3">
                  <LuMapPin className="text-emerald-500" size={24}></LuMapPin>
                  <p className="whitespace-nowrap">{report.ride.endStation?.name}</p>
                </div>
                <div className="flex  items-start">
                  <TbJetpack className="text-rose-600" size={24}></TbJetpack>
                  <p className="whitespace-nowrap">
                    {report.ride.vehicle.type.name} #{report.ride.vehicle.id.substring(30)}
                  </p>
                </div>
                {report.ride.comment ? (
                  <figure className="max-w-screen-md mx-auto text-center mt-6">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mx-auto mb-3 text-green-500 dark:text-green-400"
                      viewBox="0 0 24 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor"
                      />
                    </svg>
                    <blockquote>
                      <p className="text-sm italic font-medium text-gray-900 dark:text-white">{report.ride.comment}</p>
                    </blockquote>
                  </figure>
                ) : (
                  <p className="text-gray-500 ml-3">Pas de commentaire</p>
                )}
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ReportsList;
