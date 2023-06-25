import React, { useEffect, useState } from "react";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import { Card, Timeline } from "flowbite-react";

import { getAllRides } from "@api/gears/rides";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useAuth } from "@hooks/auth";
import { isUser } from "@typing/api/auth/users";
import type { Ride } from "@typing/api/gears/rides";

// type CalendarEvent = {
//   title: string;
//   start: string;
//   end: string;
//   url: string;
// };

const Home: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  // const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [preferedTypes, setPreferedTypes] = useState<[string, number][]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllRides().then((response) => {
      setRides(response.data.filter((ride) => ride.userId === user.id));

      setPreferedTypes(
        Object.entries(
          response.data.reduce((acc: Record<string, number>, ride) => {
            acc[ride.vehicle.type.name] = (acc[ride.vehicle.type.name] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])
      );
    });
  }, []);

  return (
    <React.Fragment>
      <Card className="w-full mb-5">
        <h5 className="text-2xl font-bold">Bienvenue sur Board N&apos; Go !</h5>
      </Card>
      {isUser(user) && (
        <div className="w-full grid grid-cols-2 gap-4">
          <Card className="row-span-2">
            <h5 className="text-xl font-medium">Évènements</h5>
            <FullCalendar
              viewClassNames={"w-full"}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={[
                {
                  title: "ROCKET LEAAAGUE",
                  start: "2023-06-23",
                  end: "2023-06-2",
                  url: "/events/ROCKET",
                },
              ]}
            />
          </Card>
          <Card>
            <h5 className="text-xl font-medium">Mes derniers trajets</h5>
            <div className="grid grid-cols-3">
              {rides.length > 0 ? (
                rides.slice(0, 3).map((ride) => (
                  <Timeline className="text-start" key={ride.id}>
                    <Timeline.Item>
                      <Timeline.Content>
                        <Timeline.Point icon={LuPlaneTakeoff} />
                        <Timeline.Time>
                          {new Date(ride.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                          {new Date(ride.createdAt).toLocaleTimeString("fr-FR")}
                        </Timeline.Time>
                        <Timeline.Title>{ride.startStation.name}</Timeline.Title>
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Content>
                        <Timeline.Point icon={LuPlaneLanding} />
                        <Timeline.Time>
                          {ride.endedAt ? (
                            <>
                              {new Date(ride.endedAt).toLocaleDateString("fr-FR")} à&nbsp;
                              {new Date(ride.endedAt).toLocaleTimeString("fr-FR")}
                            </>
                          ) : (
                            <>Course non terminée</>
                          )}
                        </Timeline.Time>
                        <Timeline.Title>{ride.endStation?.name}</Timeline.Title>
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                ))
              ) : (
                <div className="flex flex-wrap justify-center col-span-3 ">
                  <img src="/ticket.png" className="h-20 mb-2" />
                  <p className="text-center w-full">Vous n&apos;avez aucun trajet...</p>
                </div>
              )}
            </div>
          </Card>
          <Card className="row-span-2 h-max">
            <h5 className="text-xl font-medium">Véhicules préférés</h5>
            <div className="grid grid-cols-3 gap-2">
              {preferedTypes[1] && (
                <div className="flex flex-col justify-end">
                  <p>{preferedTypes[1][0]}</p>
                  <div className="flex justify-center items-center bg-gray-500 h-28 rounded-lg">
                    <img src="/medaille-dargent.png" alt="Médaille d'argent" className="h-2/3" />
                  </div>
                </div>
              )}
              {preferedTypes[0] && (
                <div className="flex flex-col justify-end">
                  <p>{preferedTypes[0][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-400 h-40 rounded-lg">
                    <img src="/medaille-dor.png" alt="Médaille d'or" className="h-2/3" />
                  </div>
                </div>
              )}
              {preferedTypes[2] && (
                <div className="flex flex-col justify-end">
                  <p>{preferedTypes[2][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-800 h-20 rounded-lg">
                    <img src="/medaille-de-bronze.png" alt="Médaille de bronze" className="h-2/3" />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
