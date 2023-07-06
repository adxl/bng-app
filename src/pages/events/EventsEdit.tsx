import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import { getAllUsers } from "@api/auth/user";
import { deleteEvent, getOneEvent, updateEvent } from "@api/events/events";
import { updateEventWinners } from "@api/events/events-winner";
import type { User } from "@typing/api/auth/users";

const UsersListOptions: React.FC<{ users: User[] }> = ({ users }) => (
  <React.Fragment>
    {users.map((user) => (
      <React.Fragment key={user.id}>
        <option key={user.id} value={user.id!}>
          {user.firstName} {user.lastName} - ({user.email})
        </option>
      </React.Fragment>
    ))}
  </React.Fragment>
);
const EventsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [_name, setName] = useState<string>("");
  const [_endedAt, setEndedAt] = useState<Date>(new Date());

  const [_users, setUsers] = useState<User[]>([]);
  const [_firstPlace, setFirstPlace] = useState<string>("");
  const [_secondPlace, setSecondPlace] = useState<string>("");
  const [_thirdPlace, setThirdPlace] = useState<string>("");
  const [_error, setError] = useState<string>("");

  useEffect(() => {
    getOneEvent(id!).then(({ data }) => {
      setName(data.name);
      setFirstPlace(data.winners[0].userId ?? "");
      setSecondPlace(data.winners[1].userId ?? "");
      setThirdPlace(data.winners[2].userId ?? "");
      if (data.endedAt) setEndedAt(new Date(data.endedAt));
    });
  }, []);

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data.filter((user) => user.role === "USER"));
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!_firstPlace || !_secondPlace || !_thirdPlace) {
      return setError("Veuillez sélectionner des gagnants");
    }

    if (!_endedAt) return setError("Veuillez sélectionner une date de fin");

    const data = {
      name: _name,
      endedAt: _endedAt,
    };

    const winners = [
      {
        userId: _firstPlace,
        rank: 1,
      },
      {
        userId: _secondPlace,
        rank: 2,
      },
      {
        userId: _thirdPlace,
        rank: 3,
      },
    ];

    updateEvent(id!, data)
      .then(() => {
        updateEventWinners(id!, { winners })
          .then(() => {
            navigate("/admin/events");
          })
          .catch(() => setError("Une erreur est survenue"));
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleDelete = () => {
    deleteEvent(id!)
      .then(() => {
        navigate("/admin/events");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-5">
        <Link to="/admin/events">
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
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Date de fin de l'évènement" />
            </div>
            <TextInput required type="date" value={_endedAt.toISOString().split("T")[0]} onChange={(e) => setEndedAt(new Date(e.target.value))} />
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Première place" />
            </div>
            <Select className="w-full" value={_firstPlace} onChange={(e) => setFirstPlace(e.target.value)}>
              <option value="">Aucun</option>
              <UsersListOptions users={_users} />
            </Select>
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Deuxième place" />
            </div>
            <Select className="w-full" value={_secondPlace} onChange={(e) => setSecondPlace(e.target.value)}>
              <option value="">Aucun</option>
              <UsersListOptions users={_users} />
            </Select>
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Troisème place" />
            </div>
            <Select className="w-full" value={_thirdPlace} onChange={(e) => setThirdPlace(e.target.value)}>
              <option value="">Aucun</option>
              <UsersListOptions users={_users} />
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

export default EventsEdit;
