import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput, ToggleSwitch } from "flowbite-react";

import { getAllStations } from "@api/gears/stations";
import { deleteVehicle, getOneVehicle, updateVehicle } from "@api/gears/vehicles";
import { getAllTypes } from "@api/gears/vehicles-types";
import type { Station } from "@typing/api/gears/stations";
import type { VehicleType } from "@typing/api/gears/vehicles-types";

const VehiclesEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [_stations, setStations] = useState<Station[]>([]);
  const [_vehiclesTypes, setVehiclesTypes] = useState<VehicleType[]>([]);

  const [_year, setYear] = useState<number>(2077);
  const [_stationId, setStationId] = useState<string>("");
  const [_typeId, setTypeId] = useState<string>("");
  const [_active, setActive] = useState<boolean>(false);

  const [_error, setError] = useState<string>("");

  useEffect(() => {
    Promise.all([getOneVehicle(id!), getAllStations(), getAllTypes()]).then(([vehicle, stations, types]) => {
      setYear(vehicle.data.year);
      setStationId(vehicle.data?.station?.id);
      setTypeId(vehicle.data.type.id);
      setActive(vehicle.data.active);

      setStations(stations.data);
      setVehiclesTypes(types.data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let data = {};
    if (_stationId) {
      data = {
        year: _year,
        type: { id: _typeId },
        station: { id: _stationId },
        active: _active,
      };
    } else {
      data = {
        year: _year,
      };
    }

    updateVehicle(id!, data)
      .then(() => {
        navigate("/admin/vehicles");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleDelete = () => {
    deleteVehicle(id!)
      .then(() => {
        navigate("/admin/vehicles");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-5">
        <Link to="/admin/vehicles">
          <Button gradientDuoTone="greenToBlue">Retour</Button>
        </Link>
        {_stationId && (
          <Button gradientDuoTone="pinkToOrange" onClick={handleDelete}>
            Supprimer
          </Button>
        )}
      </div>
      <Card className="self-center">
        {_error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <p>{_error}</p>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Année de fabrication" />
            </div>
            <TextInput required value={_year} onChange={(e) => setYear(Number(e.target.value))} />
          </div>
          {_stationId ? (
            <>
              <div className="max-w-md">
                <div className="text-start mb-2 block">
                  <Label value="Type de véhicule" />
                </div>
                <Select required onChange={(e) => setTypeId(e.target.value)} value={_typeId}>
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
                <Select required onChange={(e) => setStationId(e.target.value)} value={_stationId}>
                  {_stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <ToggleSwitch checked={_active} label="Véhicule opérationnel" onChange={(value) => setActive(value)} />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">En cours d&apos;utilisation</span>
            </div>
          )}

          <Button gradientDuoTone="greenToBlue" type="submit">
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VehiclesEdit;
