import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, TextInput, ToggleSwitch } from "flowbite-react";

import { deleteStation, getOneStation, updateStation } from "@api/gears/stations";

const StationsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [_name, setName] = useState<string>("");
  const [_latitude, setLatitude] = useState<number>(0);
  const [_longitude, setLongitude] = useState<number>(0);
  const [_active, setActive] = useState<boolean>(false);

  const [_error, setError] = useState<string>("");

  useEffect(() => {
    getOneStation(id!).then(({ data }) => {
      setName(data.name);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setActive(data.active);
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
      name: _name,
      latitude: _latitude,
      longitude: _longitude,
      active: _active,
    };

    updateStation(id!, data)
      .then(() => {
        navigate("/admin/stations");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleDelete = () => {
    deleteStation(id!)
      .then(() => {
        navigate("/admin/stations");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-5">
        <Link to="/admin/stations">
          <Button gradientDuoTone="greenToBlue">Retour</Button>
        </Link>

        <Button gradientDuoTone="pinkToOrange" onClick={handleDelete}>
          Supprimer
        </Button>
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
              <Label value="Nom de la station" />
            </div>
            <TextInput required value={_name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex gap-2">
            <div>
              <div className="flex justify-start mb-2 block">
                <Label value="Latitude" />
              </div>
              <TextInput required type="number" value={_latitude} onChange={(e) => setLatitude(Number(e.target.value))} />
            </div>
            <div>
              <div className="flex justify-start mb-2 block">
                <Label value="Longitude" />
              </div>
              <TextInput required type="number" value={_longitude} onChange={(e) => setLongitude(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <ToggleSwitch checked={_active} label="Station ouverte" onChange={(value) => setActive(value)} />
          </div>

          <Button gradientDuoTone="greenToBlue" type="submit">
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StationsEdit;
