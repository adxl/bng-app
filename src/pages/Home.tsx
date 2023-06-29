import React, { useEffect, useState } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button, Card, Timeline } from "flowbite-react";

import { getAllEvents } from "@api/events/events";
import { getSelfRides } from "@api/gears/rides";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useAuth } from "@hooks/auth";
import { isUser } from "@typing/api/auth/users";
import type { Event } from "@typing/api/events/events";
import type { Ride } from "@typing/api/gears/rides";
const Home: React.FC = () => {
  const [_rides, setRides] = useState<Ride[]>([]);
  const [_events, setEvents] = useState<Event[]>([]);
  const [_preferedTypes, setPreferedTypes] = useState<[string, number][]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (isUser(user)) {
      getSelfRides().then((response) => {
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

      getAllEvents().then((response) => {
        setEvents(response.data);
      });
    }
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
            <div className="flex items-baseline">
              <span className="text-gray-600">A venir </span>
              <FaPaintBrush className="ml-1" color="#10B981" size={15}></FaPaintBrush>
              <span className="text-gray-600">- Terminé </span>
              <FaPaintBrush className="ml-1" color="#F59E0B" size={15}></FaPaintBrush>
            </div>
            <FullCalendar
              viewClassNames={"w-full"}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={_events.map((event) => ({
                title: event.name,
                date: event.startsAt,
                allDay: true,
                backgroundColor: event.endedAt ? "#10B981" : "#F59E0B",
                borderColor: event.endedAt ? "#10B981" : "#F59E0B",
              }))}
            />
          </Card>

          <Card>
            <h5 className="text-xl font-medium">Mes derniers trajets</h5>
            <div className="grid grid-cols-3">
              {_rides.length > 0 ? (
                _rides.slice(0, 3).map((ride) => (
                  <Timeline className="text-start" key={ride.id}>
                    <Timeline.Item>
                      <Timeline.Content>
                        <Timeline.Point icon={LuPlaneTakeoff} />
                        <Timeline.Time>
                          {new Date(ride.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                          {new Date(ride.createdAt).toLocaleTimeString("fr-FR")}
                        </Timeline.Time>
                        <Timeline.Title>De: {ride.startStation.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
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
                        <Timeline.Title>À: {ride.endStation?.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
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
              {_preferedTypes[1] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[1][0]}</p>
                  <div className="flex justify-center items-center bg-gray-500 h-28 rounded-lg">
                    <img src="/medaille-dargent.png" alt="Médaille d'argent" className="h-2/3" />
                  </div>
                </div>
              )}
              {_preferedTypes[0] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[0][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-400 h-40 rounded-lg">
                    <img src="/medaille-dor.png" alt="Médaille d'or" className="h-2/3" />
                  </div>
                </div>
              )}
              {_preferedTypes[2] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[2][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-800 h-20 rounded-lg">
                    <img src="/medaille-de-bronze.png" alt="Médaille de bronze" className="h-2/3" />
                  </div>
                </div>
              )}
            </div>
          </Card>
          <Button color="dark">
            <Link to="events">Voir tous les évènements</Link>
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
