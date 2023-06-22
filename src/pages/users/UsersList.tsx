import React, { useEffect, useState } from "react";
import { HiOutlineTrash, HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button, Select, Table, TextInput } from "flowbite-react";

import { deleteUser, getAllUsers, updateRole } from "@api/auth/user";
import { useAuth } from "@hooks/auth";
import type { UserRole } from "@typing/api/auth/users";
import { type User, RolesList } from "@typing/api/auth/users";

const UsersList: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data.filter((oneUser) => oneUser.id !== user.id));
      setFilteredUsers(response.data.filter((oneUser) => oneUser.id !== user.id));
    });
  }, [user]);

  function handleEmailChange(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handleRoleChange(id: string | null, event: React.ChangeEvent<HTMLSelectElement>): void {
    // find a better solution for id parameter
    const newRole = RolesList.find((role) => role === event.currentTarget.value) as UserRole;
    updateRole(id ?? "", { role: newRole }).then();
  }

  function handleRemoveUser(id: string | null) {
    deleteUser(id ?? "").then((response) => {
      response;
    });
  }

  useEffect(() => {
    setFilteredUsers(users.filter((oneUser) => oneUser.email?.includes(email)));
  }, [email]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full mb-5">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold mr-2">Utilisateurs</h3>
          <Link to={"/admin/users/create"}>
            <Button color={"success"}>
              <HiUserAdd className="w-4 h-4" />
              Créer
            </Button>
          </Link>
        </div>
        <TextInput type="text" className="mr-2" placeholder="E-mail..." value={email} onChange={handleEmailChange} />
      </div>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>E-mail</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Prénom</Table.HeadCell>
          <Table.HeadCell>Rôle</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((oneUser) => (
              <Table.Row className="bg-white" key={oneUser.id}>
                <Table.Cell>{oneUser.email}</Table.Cell>
                <Table.Cell>{oneUser.firstName}</Table.Cell>
                <Table.Cell>{oneUser.lastName}</Table.Cell>
                <Table.Cell>
                  {oneUser.role && oneUser.id && (
                    <Select onChange={(e) => handleRoleChange(oneUser.id, e)} defaultValue={oneUser.role}>
                      {RolesList.map((role) => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button color={"failure"} onClick={() => handleRemoveUser(oneUser.id)}>
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
  );
};

export default UsersList;
