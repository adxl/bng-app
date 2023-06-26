import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import { getAllUsers } from "@api/auth/user";
import { deleteEvent, getOneEvent, updateEvent } from "@api/events/events";
import { updateEventWinners } from "@api/events/eventsWinners";
import type { User } from "@typing/api/auth/users";

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
      data.winners.forEach((winner) => {
        if (winner.rank === 1 && winner.userId != null) setFirstPlace(winner.userId);
        if (winner.rank === 2 && winner.userId != null) setSecondPlace(winner.userId);
        if (winner.rank === 3 && winner.userId != null) setThirdPlace(winner.userId);
      });
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

    if (!_firstPlace || !_secondPlace || !_thirdPlace) return setError("Veuillez sélectionner un gagnant");
    if (!_endedAt) return setError("Veuillez sélectionner une date de fin");
    const data = {
      name: _name,
      endedAt: _endedAt,
    };

    updateEvent(id!, data)
      .then(() => {
        navigate("/admin/events");
      })
      .catch(() => setError("Une erreur est survenue"));

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

    winners.forEach((winner) => {
      updateEventWinners(id!, winner)
        .then(() => {
          navigate("/admin/events");
        })
        .catch(() => setError("Une erreur est survenue"));
    });
  };

  const handleDelete = () => {
    deleteEvent(id!)
      .then(() => {
        navigate("/admin/events");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Button color="dark">
          <Link to="/admin/events">Retour</Link>
        </Button>
        <Button color="failure" onClick={handleDelete}>
          Supprimer
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
              {_users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} - ({user.email})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Deuxième place" />
            </div>
            <Select className="w-full" value={_secondPlace} onChange={(e) => setSecondPlace(e.target.value)}>
              <option value="">Aucun</option>
              {_users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} - ({user.email})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="flex justify-start mb-2 block">
              <Label value="Troisème place" />
            </div>
            <Select className="w-full" value={_thirdPlace} onChange={(e) => setThirdPlace(e.target.value)}>
              <option value="">Aucun</option>
              {_users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} - ({user.email})
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

export default EventsEdit;
