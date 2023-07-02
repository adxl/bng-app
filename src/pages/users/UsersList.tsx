import React, { useEffect, useState } from "react";
import { HiInformationCircle, HiOutlineTrash, HiSearch, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Alert, Button, Select, Table, TextInput } from "flowbite-react";

import { deleteUser, getAllUsers, updateRole } from "@api/auth/user";
import { useAuth } from "@hooks/auth";
import { type User, RolesList } from "@typing/api/auth/users";

const UsersList: React.FC = () => {
  const { user } = useAuth();
  const [_users, setUsers] = useState<User[]>([]);
  const [_filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [_email, setEmail] = useState<string>("");

  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  }, [_error, _success]);

  function handleEmailChange(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handleRoleChange(id: string, roleId: string): void {
    const newRole = RolesList.find((role) => role === roleId);

    if (!newRole) return setError("Rôle invalide");

    updateRole(id, { role: newRole })
      .then(() => {
        fetchUsers();
        setSuccess("Le rôle a bien été modifié");
      })
      .catch(() => setError("Une erreur est survenue"));
  }

  function handleRemoveUser(id: string) {
    deleteUser(id)
      .then(() => {
        fetchUsers();
        setSuccess("L'utilisateur a bien été supprimé");
      })
      .catch(() => setError("Une erreur est survenue"));
  }

  function fetchUsers() {
    getAllUsers().then((response) => {
      setUsers(response.data.filter((oneUser) => oneUser.id !== user.id));
      setFilteredUsers(response.data.filter((oneUser) => oneUser.id !== user.id));
    });
  }

  useEffect(() => {
    setFilteredUsers(_users.filter((oneUser) => oneUser.email?.includes(_email)));
  }, [_email]);

  return (
    <div className="flex flex-col w-full overflow-x-scrool">
      <div className="flex justify-between items-center w-full mb-5 ">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold mr-2">Utilisateurs</h3>
          <Link to={"create"}>
            <Button gradientDuoTone="greenToBlue">
              <HiUserAdd className="w-4 h-4" />
              Créer
            </Button>
          </Link>
        </div>
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
        <TextInput icon={HiSearch} type="text" className="mr-2 hidden md:flex" placeholder="E-mail..." value={_email} onChange={handleEmailChange} />
      </div>
      <div id="users-table">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>E-mail</Table.HeadCell>
            <Table.HeadCell>Nom</Table.HeadCell>
            <Table.HeadCell>Prénom</Table.HeadCell>
            <Table.HeadCell>Rôle</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {_filteredUsers.length > 0 ? (
              _filteredUsers.map((oneUser) => (
                <Table.Row className="bg-white" key={oneUser.id}>
                  <Table.Cell>{oneUser.email}</Table.Cell>
                  <Table.Cell>{oneUser.firstName}</Table.Cell>
                  <Table.Cell>{oneUser.lastName}</Table.Cell>
                  <Table.Cell>
                    {oneUser.role && oneUser.id && (
                      <Select
                        style={{ minWidth: "fit-content" }}
                        onChange={(e) => handleRoleChange(oneUser.id!, e.target.value)}
                        defaultValue={oneUser.role}
                      >
                        {RolesList.map((role) => (
                          <option value={role} key={role}>
                            {role}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button gradientDuoTone="pinkToOrange" onClick={() => handleRemoveUser(oneUser.id!)}>
                      <HiOutlineTrash className="w-4 h-4" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white">
                <Table.Cell colSpan={5}>
                  <div className="flex flex-col items-center w-full">
                    <img src="/confus.png" className="w-32 h-32 mb-2" />
                    <span className="text-lg">Aucun utilisateur trouvé...</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;
