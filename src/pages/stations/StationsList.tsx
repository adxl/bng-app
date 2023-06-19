import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "flowbite-react";

import { getAllStations } from "@api/gears";
import type { Station } from "@typing/api/gears/stations";

import "leaflet/dist/leaflet.css";

const StationsMap: React.FC = () => {
  const [_stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    getAllStations().then(({ data }) => setStations(data));
  }, []);

  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {_stations.map((station) => (
        <Card key={station.id}>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <p> {station.name} </p>
              {station.active ? (
                <Badge color="green" className="mr-3">
                  Active
                </Badge>
              ) : (
                <Badge color="red" className="mr-3">
                  Inactive
                </Badge>
              )}
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
                  .reduce(
                    (map, vehicle) => map.set(vehicle.type.name, (map.get(vehicle.type.name) || 0) + 1),
                    new Map()
                  ),
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
          <Button color="dark" onClick={() => alert()}>
            Modifier
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default StationsMap;
