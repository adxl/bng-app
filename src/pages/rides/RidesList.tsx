import React, { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import { Card, Timeline } from "flowbite-react";

import { findUsersByIds } from "@api/auth/user";
import { getAllRides, getSelfRides } from "@api/gears/rides";
import { useAuth } from "@hooks/auth";
import { hasBackScope, isUser } from "@typing/api/auth/users";
import type { Ride } from "@typing/api/gears/rides";

const RidesList: React.FC = () => {
  const { user } = useAuth();

  const [_rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    if (isUser(user)) {
      getSelfRides().then(({ data }) => {
        setRides(data);
      });
    }

    if (hasBackScope(user)) {
      getAllRides().then(({ data: ridesData }) => {
        const ridesUsers = ridesData.map((ride) => ride.userId);
        findUsersByIds({ ids: ridesUsers }).then(({ data: users }) => {
          const rides = ridesData.map((r) => ({ ...r, user: users.find((u) => u.id === r.userId) }));
          setRides(rides);
        });
      });
    }
  }, []);

  return (
    <>
      {_rides.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
          {_rides
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((ride) => (
              <Card key={ride.id}>
                <div className="flex flex-col">
                  <div className="w-full flex items-center justify-between gap-2">
                    <Timeline horizontal className="w-full flex justify-between">
                      <Timeline.Item>
                        <Timeline.Point icon={LuPlaneTakeoff} />
                        <Timeline.Content>
                          <Timeline.Title>{ride.startStation.name}</Timeline.Title>
                          <Timeline.Time>
                            {new Date(ride.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                            {new Date(ride.createdAt).toLocaleTimeString("fr-FR")}
                          </Timeline.Time>
                          <Timeline.Body>
                            <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                          </Timeline.Body>
                        </Timeline.Content>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Timeline.Point icon={LuPlaneLanding} />
                        <Timeline.Content>
                          <Timeline.Title>{ride.endStation?.name}</Timeline.Title>
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
                        </Timeline.Content>
                      </Timeline.Item>
                    </Timeline>
                  </div>
                  <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  {ride.comment ? (
                    <figure className="max-w-screen-md mx-auto text-center">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mx-auto mb-3 text-cyan-700 dark:text-cyan-600"
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
                        <p className="text-sm italic font-medium text-gray-900 dark:text-white">{ride.comment}</p>
                      </blockquote>
                    </figure>
                  ) : (
                    <p className="text-gray-500 ml-3">Pas de commentaire</p>
                  )}
                  <div className="flex justify-center mt-4">
                    {ride.endedAt && ride.review !== null ? (
                      <div className="flex">
                        {[...Array(5)].map((_, index) => {
                          const currentRating = index + 1;
                          return (
                            <label key={currentRating}>
                              <HiStar className="star" size={32} color={currentRating <= ride.review! ? "#ffc107" : "#e4e5e9"} />
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 ml-3">Pas de review</p>
                    )}
                  </div>
                  {ride.user && (
                    <div className="mt-3">
                      <span>{ride.user.firstName}</span>&nbsp;
                      <span>{ride.user.lastName?.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <h2 className="text-4xl font-extrabold dark:text-white">Aucune course</h2>
        </div>
      )}
    </>
  );
};

export default RidesList;
