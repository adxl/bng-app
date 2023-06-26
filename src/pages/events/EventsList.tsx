import React from "react";
import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";

import { getAllEvents } from "@api/events/events";
import { useAuth } from "@hooks/auth";
import { isOrganizer } from "@typing/api/auth/users";
import type { Event } from "@typing/api/events/events";
const EventsList: React.FC = () => {
  const { user } = useAuth();
  const [_events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllEvents().then(({ data }) => setEvents(data));
  }, []);

  return (
    <>
      {isOrganizer(user) && (
        <div className="flex justify-end mb-4">
          <Button color="dark">
            <Link to="create">Ajouter un évènement</Link>
          </Button>
        </div>
      )}
      <div className="w-full grid grid-cols-3 gap-4">
        {_events.map((event) => (
          <Card key={event.id}>
            <div className="flex flex-col items-start">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex align-center">
                  <p className="whitespace-nowrap">{event.name}</p>
                  {event.endedAt ? (
                    <Badge color="red" size="sm" className="ml-3">
                      Terminé
                    </Badge>
                  ) : (
                    <Badge color="warning" size="sm" className="ml-3">
                      A_venir
                    </Badge>
                  )}
                </div>
                <div className="w-full flex justify-end">
                  {isOrganizer(user) && (
                    <Link to={`edit/${event.id}`}>
                      <Button color="dark">
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
                <p className="text-gray-500 ml-3">Fin: A venir</p>
              )}
              <p className="text-gray-500 ml-3">Lieu: {event.stationId}</p>
              {/* todo : allez chercher le nom de la staion */}
            </div>
            {event.endedAt ? (
              <ul className="flex items-center">
                {event.winners.map((winner, index) => (
                  <div key={index} className="flex mr-5 i">
                    {winner.rank === 1 ? (
                      <img src="/medaille-dor.png" alt="Médaille d'or" className="w-6 h-6" />
                    ) : winner.rank === 2 ? (
                      <img src="/medaille-dargent.png" alt="Médaille d'argent" className="w-6 h-6" />
                    ) : (
                      <img src="/medaille-de-bronze.png" alt="Médaille de bronze" className="w-6 h-6" />
                    )}
                    {/* {winner.userId} */}
                    Paul Richard
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 ml-3">Résultats: A venir</p>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default EventsList;
