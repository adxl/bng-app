import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Label, Select, TextInput } from "flowbite-react";

import type { CreateDto } from "@api/auth/dto/users.dto";
import { createUser } from "@api/auth/user";
import { RolesList } from "@typing/api/auth/users";

const UsersCreate: React.FC = () => {
  const navigate = useNavigate();

  const [_email, setEmail] = useState<string>("");
  const [_firstName, setFirstName] = useState<string>("");
  const [_lastName, setLastName] = useState<string>("");
  const [_role, setRole] = useState<string>(RolesList[0]);

  const [_error, setError] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    const data: CreateDto = {
      firstName: _firstName,
      lastName: _lastName,
      email: _email,
      role: _role,
    };

    createUser(data)
      .then(() => navigate("/admin/users"))
      .catch(() => setError("une erreur est survenue"));
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-5">
        <Link to="/admin/users">
          <Button color="dark">
            <HiArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
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
              <Label value="Prénom" />
            </div>
            <TextInput type="text" required value={_firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Nom" />
            </div>
            <TextInput type="text" required value={_lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="E-mail" />
            </div>
            <TextInput type="email" required value={_email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <div className="text-start mb-2 block">
              <Label value="Rôle" />
            </div>
            <Select required onChange={(e) => setRole(e.currentTarget.value)} defaultValue={RolesList[0]}>
              {RolesList.map((role) => (
                <option key={role} value={role}>
                  {role}
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

export default UsersCreate;
