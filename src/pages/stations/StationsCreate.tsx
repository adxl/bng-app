import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";

import { createStation } from "@api/gears/stations";

const StationsCreate: React.FC = () => {
  const navigate = useNavigate();

  const [_name, setName] = useState<string>("");
  const [_latitude, setLatitude] = useState<number>(48);
  const [_longitude, setLongitude] = useState<number>(2);

  const [_error, setError] = useState<string>("");

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
    };

    createStation(data)
      .then(() => {
        navigate("/admin/stations");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div>
      <div className="flex mb-5">
        <Button color="dark">
          <Link to="/admin/stations">Retour</Link>
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
          <Button color="dark" type="submit">
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StationsCreate;
