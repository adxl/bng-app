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
        <Dropdown
          inline
          label={
            <Avatar alt="User" img="/jetpack.png" rounded>
              <div className="flex mr-5">
                <img src="/cap.png" alt="cap" className="w-6 h-6 mr-2" />
                <span>200</span>
              </div>
            </Avatar>
          }
          className="rounded-md"
          arrowIcon={false}
        >
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
        <div className="flex items-center">
          <div className="flex mr-2">
            <img src="/medaille-dor.png" alt="Médaille d'or" className="w-6 h-6" />
            <span>5</span>
          </div>
          <div className="flex mr-2">
            <img src="/medaille-dargent.png" alt="Médaille d'or" className="w-6 h-6" />
            <span>6</span>
          </div>
          <div className="flex mr-2">
            <img src="/medaille-de-bronze.png" alt="Médaille d'or" className="w-6 h-6" />
            <span>1</span>
          </div>
        </div>
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
