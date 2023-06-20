import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import { Card, Timeline } from "flowbite-react";

import { getAllRides } from "@api/gears/rides";
import { useAuth } from "@hooks/auth";
import { ADMINISTRATOR } from "@typing/api/auth/users";
import type { Event } from "@typing/api/events/events";
import type { Ride } from "@typing/api/gears/rides";

import "react-calendar/dist/Calendar.css";

const Home: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllRides().then((response) => {
      setRides(response.data.filter((ride) => ride.userId === user.id));
    });
  }, []);

  return (
    <React.Fragment>
      <Card className="w-full mb-5">
        <h5 className="text-2xl font-bold">Bienvenue sur Board N&apos; Go !</h5>
      </Card>
      {user.role === ADMINISTRATOR && (
        <div className="w-full grid grid-cols-2 gap-4">
          <Card className="flex items-center row-span-2">
            <h5 className="text-xl font-medium">Évènements</h5>
            <Calendar
              className="border-none"
              tileClassName={({ date }) => {
                if (
                  events.find(
                    (event) => new Date(event.startsAt).toLocaleDateString("fr-FR") === date.toLocaleDateString("fr-FR")
                  )
                ) {
                  return "highlight";
                }
              }}
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
                          {new Date(ride.endedAt).toLocaleDateString("fr-FR")} à&nbsp;
                          {new Date(ride.endedAt).toLocaleTimeString("fr-FR")}
                        </Timeline.Time>
                        <Timeline.Title>{ride.endStation.name}</Timeline.Title>
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
          <Card className="row-span-2">
            <h5 className="text-xl font-medium">Évènements</h5>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
