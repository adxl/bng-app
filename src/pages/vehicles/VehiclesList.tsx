import React, { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";

import { getAllVehicles } from "@api/gears/vehicles";
import { useAuth } from "@hooks/auth";
import { isTechnician } from "@typing/api/auth/users";
import type { Vehicle } from "@typing/api/gears/vehicles";

const VehiclesList: React.FC = () => {
  const { user } = useAuth();

  const [_vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getAllVehicles().then(({ data }) => setVehicles(data));
  }, []);

  return (
    <>
      {isTechnician(user) && (
        <div className="flex justify-end my-4">
          <Button color="dark">
            <Link to="create">Ajouter un véhicule</Link>
          </Button>
        </div>
      )}
      <div className="w-full grid grid-cols-3 gap-4">
        {_vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <div className="flex flex-col items-start">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex align-center">
                  <p className="whitespace-nowrap">#{vehicle.id.substring(30)}</p>
                  {vehicle.active ? (
                    <Badge color="green" className="mr-3">
                      Opérationnel
                    </Badge>
                  ) : (
                    <Badge color="red" className="whitespace-nowrap mr-3">
                      En panne
                    </Badge>
                  )}
                </div>
                <div className="w-full flex justify-end">
                  {isTechnician(user) && (
                    <Link to={`edit/${vehicle.id}`}>
                      <Button color="dark">
                        <HiPencilSquare />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <strong>Année de fabrication:</strong>
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <strong>Type:</strong>
                <span>{vehicle.type.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <strong>Station actuel:</strong>
                <span>{vehicle.station.name || "En cours d'utilisation"}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {isTechnician(user) && _vehicles.length > 9 && (
        <div className="flex justify-end my-4">
          <Button color="dark">
            <Link to="create">Ajouter un véhicule</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default VehiclesList;
