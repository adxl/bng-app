import React from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Avatar, Badge, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";

import { useAuth } from "@hooks/auth";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <FlowbiteNavbar className="mb-5 bg-gray-50 shadow-lg rounded-md">
      <FlowbiteNavbar.Brand as={Link} to="/">
        <img src="/logo.png" alt="BNG Logo" className="w-12 h-12 mr-3" />
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2 items-center">
        <Badge color="indigo" className="mr-3">
          {user.role}
        </Badge>
        <Dropdown inline label={<Avatar alt="User" img="/jetpack.png" rounded />} className="rounded-md">
          <Dropdown.Header>
            <span className="block text-sm">
              Bonjour&nbsp;
              <b>
                {user.firstName} {user.lastName}
              </b>
              &nbsp;!
            </span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Link to={"#"}>
            <Dropdown.Item>
              <HiOutlineAdjustments className="w-6 h-6 mr-2" />
              <p>Profil</p>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout} className="text-red-600">
            <HiArrowLeftOnRectangle className="w-6 h-6 mr-2" />
            <p>Se déconnecter</p>
          </Dropdown.Item>
        </Dropdown>
        <FlowbiteNavbar.Toggle />
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
