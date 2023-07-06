import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Accordion, Alert, Button, Card, Label, TextInput } from "flowbite-react";

import { updatePassword, updateProfile } from "@api/auth/user";
import { useAuth } from "@hooks/auth";

const Profile: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const [_firstName, setFirstName] = useState<string>(user.firstName!);
  const [_lastName, setLastName] = useState<string>(user.lastName!);

  const [_odlPwd, setOldPwd] = useState<string>("");
  const [_newPwd, setNewPwd] = useState<string>("");
  const [_confirmNewPwd, setConfirmNewPwd] = useState<string>("");

  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  }, [_error, _success]);

  function handleProfileSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (!_firstName.length || !_lastName.length) setError("Une erreur est survenue");

    if (user.id)
      updateProfile(user.id, { firstName: _firstName, lastName: _lastName })
        .then(() => {
          refreshUser();
          setSuccess("Profil changé avec succès !");
        })
        .catch(() => setError("Une erreur est survenue"));
  }

  function handlePasswordSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (!_odlPwd.length || !_newPwd.length || !_confirmNewPwd.length) setError("Une erreur est survenue");

    if (user.id && _newPwd === _confirmNewPwd)
      updatePassword(user.id, { oldPwd: _odlPwd, password: _newPwd })
        .then(() => setSuccess("Mot de passe changé avec succès !"))
        .catch(() => setError("Une erreur est survenue"));
    else setError("Les mots de passe ne correspondent pas");
  }

  return (
    <div className="flex flex-col w-full items-center">
      {_error && (
        <Alert color="failure" className="mb-5" icon={HiInformationCircle}>
          <p>{_error}</p>
        </Alert>
      )}
      {_success && (
        <Alert color="success" className="mb-5" icon={HiInformationCircle}>
          <p>{_success}</p>
        </Alert>
      )}
      <Card horizontal imgSrc="/boy.png" className="text-start mb-5">
        <h5 className="text-2xl font-bold">Board N&apos; Go license</h5>
        <p className="font-normal text-gray-800">
          <b>Prénom : </b> {user.firstName}
        </p>
        <p className="font-normal text-gray-800">
          <b>Nom : </b> {user.lastName}
        </p>
        <p className="font-normal text-gray-800">
          <b>Membre depuis : </b> {new Date(user.createdAt!).toLocaleDateString("fr-FR")}
        </p>
      </Card>
      <Accordion className="w-full">
        <Accordion.Panel>
          <Accordion.Title>Modifier mon profil</Accordion.Title>
          <Accordion.Content>
            <div className="flex justify-center w-full">
              <form className="flex flex-col max-w-md w-1/2 gap-4" onSubmit={handleProfileSubmit}>
                <div>
                  <div className="text-start mb-2 block">
                    <Label value="Prénom" />
                  </div>
                  <TextInput type="text" required defaultValue={user.firstName!} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div>
                  <div className="text-start mb-2 block">
                    <Label value="Nom" />
                  </div>
                  <TextInput type="text" required defaultValue={user.lastName!} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <Button gradientDuoTone="greenToBlue" type="submit">
                  Enregistrer
                </Button>
              </form>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Modifier mon mot de passe</Accordion.Title>
          <Accordion.Content>
            <div className="flex justify-center w-full">
              <form className="flex flex-col max-w-md w-1/2 gap-4" onSubmit={handlePasswordSubmit}>
                <div>
                  <div className="text-start mb-2 block">
                    <Label value="Ancien mot de passe" />
                  </div>
                  <TextInput type="password" required value={_odlPwd} onChange={(e) => setOldPwd(e.target.value)} placeholder="●●●●●●●●●●" />
                </div>

                <div>
                  <div className="text-start mb-2 block">
                    <Label value="Nouveau mot de passe :" />
                  </div>
                  <TextInput type="password" required value={_newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="●●●●●●●●●●" />
                </div>

                <div>
                  <div className="text-start mb-2 block">
                    <Label value="Confirmez le nouveau mot de passe :" />
                  </div>
                  <TextInput
                    type="password"
                    required
                    value={_confirmNewPwd}
                    onChange={(e) => setConfirmNewPwd(e.target.value)}
                    placeholder="●●●●●●●●●●"
                  />
                </div>

                <Button gradientDuoTone="greenToBlue" type="submit">
                  Enregistrer
                </Button>
              </form>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default Profile;
