import React, { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";

import { getAllStations } from "@api/gears/stations";
import { useAuth } from "@hooks/auth";
import { isTechnician } from "@typing/api/auth/users";
import type { Station } from "@typing/api/gears/stations";

const StationsList: React.FC = () => {
  const { user } = useAuth();

  const [_stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    getAllStations().then(({ data }) => setStations(data));
  }, []);

  return (
    <>
      {isTechnician(user) && (
        <div className="flex justify-end mb-4">
          <Link to="create">
            <Button gradientDuoTone="greenToBlue">Ajouter une station</Button>
          </Link>
        </div>
      )}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {_stations.map((station) => (
          <Card key={station.id}>
            <div className="flex flex-col items-start">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex align-center gap-2">
                  <p className="whitespace-nowrap">{station.name}</p>
                  {station.active ? (
                    <Badge color="green" className="mr-3">
                      Ouverte
                    </Badge>
                  ) : (
                    <Badge color="red" className="mr-3">
                      Fermée
                    </Badge>
                  )}
                </div>
                <div className="w-full flex justify-end">
                  {isTechnician(user) && (
                    <Link to={`edit/${station.id}`}>
                      <Button gradientDuoTone="greenToBlue">
                        <HiPencilSquare />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-gray-500">
                [{station.latitude.toFixed(2)}, {station.longitude.toFixed(2)}]
              </p>
            </div>
            {station.vehicles.length ? (
              <ul>
                {Array.from(
                  station.vehicles
                    .sort((a, b) => (a.type.capsMilestone < b.type.capsMilestone ? -1 : 1))
                    .reduce((map, vehicle) => map.set(vehicle.type.name, (map.get(vehicle.type.name) || 0) + 1), new Map()),
                  ([name, count]) => ({ name, count })
                ).map((vehicleSet, index) => (
                  <li key={index} className="flex content-start gap-1">
                    <strong>x{vehicleSet.count}</strong>
                    <span>{vehicleSet.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun véhicule dans cette station</p>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default StationsList;
