import React from "react";
import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";

import { findPublicUsersByIds } from "@api/auth/user";
import { getAllEvents } from "@api/events/events";
import { findStationByIds } from "@api/gears/stations";
import { useAuth } from "@hooks/auth";
import { isOrganizer } from "@typing/api/auth/users";
import type { Event } from "@typing/api/events/events";

const EventsList: React.FC = () => {
  const { user } = useAuth();
  const [_events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllEvents().then(({ data: eventsData }) => {
      const eventsStations = eventsData.map((e) => e.stationId);
      const eventsUsers = eventsData.flatMap((e) => e.winners.map((w) => w.userId)).filter((u) => u);

      Promise.all([findStationByIds({ ids: eventsStations }), findPublicUsersByIds({ ids: eventsUsers })]).then(([stations, users]) => {
        const events = eventsData.map((e) => ({
          ...e,
          station: stations.data.find((s) => s.id === e.stationId),
          winners: e.winners.map((w) => ({ ...w, user: users.data.find((u) => u.id === w.userId) })),
        }));
        setEvents(events);
      });
    });
  }, []);

  return (
    <>
      {isOrganizer(user) && (
        <div className="flex justify-end mb-4">
          <Link to="create">
            <Button gradientDuoTone="greenToBlue">Ajouter un évènement</Button>
          </Link>
        </div>
      )}
      <div className="w-full grid grid-cols-3 gap-4">
        {_events
          .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())
          .map((event) => (
            <Card key={event.id}>
              <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex align-center">
                    <p className="whitespace-nowrap">{event.name}</p>
                    {event.endedAt ? (
                      <Badge color="green" size="sm" className="ml-3">
                        Terminé
                      </Badge>
                    ) : (
                      <Badge color="warning" size="sm" className="ml-3 whitespace-nowrap">
                        À venir
                      </Badge>
                    )}
                  </div>
                  <div className="w-full flex justify-end">
                    {isOrganizer(user) && (
                      <Link to={`edit/${event.id}`}>
                        <Button gradientDuoTone="greenToBlue">
                          <HiPencilSquare />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 ml-3">Début: {new Date(event.startsAt).toLocaleDateString("fr-FR")}</p>
                {event.endedAt ? (
                  <p className="text-gray-500 ml-3">Fin: {new Date(event.endedAt).toLocaleDateString("fr-FR")}</p>
                ) : (
                  <p className="text-gray-500 ml-3">Fin: À venir</p>
                )}
                <p className="text-gray-500 ml-3">Lieu: {event.station?.name || "Non disponible"}</p>
              </div>

              {event.endedAt ? (
                <ul className="flex flex-col items-start">
                  {event.winners
                    .sort((a, b) => a.rank - b.rank)
                    .map((winner, index) => (
                      <div key={index} className="flex gap-2 m-1 i">
                        {winner.rank === 1 && (
                          <div className="flex align-center">
                            <img src="/medaille-dor.png" alt="Médaille d'or" className="w-6 h-6" />
                            <strong>1ère place:</strong>
                          </div>
                        )}
                        {winner.rank === 2 && (
                          <div className="flex align-center">
                            <img src="/medaille-dargent.png" alt="Médaille d'argent" className="w-6 h-6" />
                            <strong>2e place:</strong>
                          </div>
                        )}
                        {winner.rank === 3 && (
                          <div className="flex align-center">
                            <img src="/medaille-de-bronze.png" alt="Médaille de bronze" className="w-6 h-6" />
                            <strong>3e place:</strong>
                          </div>
                        )}
                        {winner.user ? (
                          <span>
                            {winner.user?.firstName || ""} {winner.user?.lastName || ""}
                          </span>
                        ) : (
                          <i>-</i>
                        )}
                      </div>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500 ml-3">Résultats à venir</p>
              )}
            </Card>
          ))}
      </div>
    </>
  );
};

export default EventsList;
