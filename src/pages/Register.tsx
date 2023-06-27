import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";

import { register } from "@api/auth/auth";
import type { RegisterDto } from "@api/auth/dto/auth.dto";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [_firstName, setFirstName] = useState<string>("");
  const [_lastName, setLastName] = useState<string>("");
  const [_email, setEmail] = useState<string>("");
  const [_password, setPassword] = useState<string>("");
  const [_confirmPassword, setConfirmPassword] = useState<string>("");

  const [_error, setError] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [_error]);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (_password !== _confirmPassword) return setError("Les mots de passe ne correspondent pas");

    const data: RegisterDto = {
      firstName: _firstName,
      lastName: _lastName,
      email: _email,
      password: _password,
    };

    register(data)
      .then(() => navigate("/login"))
      .catch(() => setError("Une erreur est survenue"));
  }

  return (
    <div className="flex flex-col items-center w-full py-4 rounded-lg">
      {_error && (
        <Alert color="failure" className="mb-5" icon={HiInformationCircle}>
          <p>{_error}</p>
        </Alert>
      )}
      <Card className="max-w-md w-full">
        <h5 className="text-lg">Créer un compte</h5>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
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

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Mot de passe" />
            </div>
            <TextInput type="password" required value={_password} onChange={(e) => setPassword(e.target.value)} placeholder="●●●●●●●●●●" />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Confirmation du mot de passe" />
            </div>
            <TextInput
              type="password"
              required
              value={_confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="●●●●●●●●●●"
            />
          </div>

          <Button type="submit" color="dark">
            Enregistrer
          </Button>
        </form>
        <Link to={"/login"} className="text-md underline">
          <small>J&apos;ai déjà un compte</small>
        </Link>
      </Card>
    </div>
  );
};

export default Register;
