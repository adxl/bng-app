import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import { getAllStations } from "@api/gears/stations";
import { createVehicle } from "@api/gears/vehicles";
import { getAllTypes } from "@api/gears/vehicles-types";
import type { Station } from "@typing/api/gears/stations";
import type { VehicleType } from "@typing/api/gears/vehicles-types";

const VehiclesCreate: React.FC = () => {
  const navigate = useNavigate();

  const [_stations, setStations] = useState<Station[]>([]);
  const [_vehiclesTypes, setVehiclesTypes] = useState<VehicleType[]>([]);

  const [_year, setYear] = useState<number>(2077);
  const [_stationId, setStationId] = useState<string>("");
  const [_typeId, setTypeId] = useState<string>("");

  const [_error, setError] = useState<string>("");

  useEffect(() => {
    Promise.all([getAllStations(), getAllTypes()]).then(([stations, types]) => {
      setStations(stations.data);
      setVehiclesTypes(types.data);

      setStationId(stations.data[0].id);
      setTypeId(types.data[0].id);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      year: _year,
      type: { id: _typeId },
      station: { id: _stationId },
    };

    createVehicle(data)
      .then(() => {
        navigate("/admin/vehicles");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-5">
        <Link to="/admin/vehicles">
          <Button gradientDuoTone="greenToBlue">Retour</Button>
        </Link>
      </div>
      <Card className="self-center">
        {_error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <p>{_error}</p>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="text-start mb-2 block">
              <Label value="Année de fabrication" />
            </div>
            <TextInput type="number" required value={_year} onChange={(e) => setYear(Number(e.target.value))} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Type de véhicule" />
            </div>
            <Select required onChange={(e) => setTypeId(e.target.value)}>
              {_vehiclesTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Station actuelle" />
            </div>
            <Select required onChange={(e) => setStationId(e.target.value)}>
              {_stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Select>
          </div>

          <Button gradientDuoTone="greenToBlue" type="submit">
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VehiclesCreate;
