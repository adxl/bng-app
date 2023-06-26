import React from "react";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import { createEvent } from "@api/events/events";
import { getAllStations } from "@api/gears/stations";
import type { Station } from "@typing/api/gears/stations";

const EventsCreate: React.FC = () => {
  const navigate = useNavigate();
  const [_name, setName] = useState<string>("");
  const [_startsAt, setStartsAt] = useState<Date>(new Date());
  const [_stationId, setStationId] = useState<string>("");
  const [_error, setError] = useState<string>("");
  const [_stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  useEffect(() => {
    getAllStations().then((response) => {
      setStations(response.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: _name,
      startsAt: _startsAt,
      stationId: _stationId,
    };

    createEvent(data)
      .then(() => {
        navigate("/admin/events");
      })
      .catch(() => setError("Une erreur est survenue"));
  };
  return (
    <div>
      <div className="flex mb-5">
        <Button color="dark">
          <Link to="/admin/events">Retour</Link>
        </Button>
      </div>
      <Card>
        {_error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <p>{_error}</p>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Nom de l'évènement" />
            </div>
            <TextInput required value={_name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Date du début de l'évènement" />
            </div>
            <TextInput required type="date" value={_startsAt.toISOString().split("T")[0]} onChange={(e) => setStartsAt(new Date(e.target.value))} />
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Station" />
            </div>
            <Select required value={_stationId} onChange={(e) => setStationId(e.target.value)}>
              {_stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Select>
          </div>

          <Button color="dark" type="submit">
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EventsCreate;
