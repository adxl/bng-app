import React, { useEffect, useState } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Avatar, Badge, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";

import { getSelfEventsWinner } from "@api/events/events-winner";
import { useAuth } from "@hooks/auth";
import { isUser } from "@typing/api/auth/users";
import type { SelfEventWinner } from "@typing/api/events/event-winner";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const [_eventsWinner, setEventsWinner] = useState<SelfEventWinner | null>(null);

  useEffect(() => {
    getSelfEventsWinner(user.id!).then((response) => {
      setEventsWinner(response.data);
    });
  }, []);

  return (
    <FlowbiteNavbar className="mb-5 bg-gray-50 shadow-lg rounded-md">
      <FlowbiteNavbar.Brand as={Link} to="/">
        <img src="/logo.png" alt="BNG Logo" className="w-16 h-16 mr-3" />
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2 items-center">
        <FlowbiteNavbar.Toggle />
        {isUser(user) && _eventsWinner && (
          <div className="flex items-center">
            <div className="flex mr-5">
              <img src="/cap.png" alt="cap" className="w-6 h-6 mr-2" />
              <span>{_eventsWinner.caps}</span>
            </div>
            <div className="flex mr-2">
              <img src="/medaille-dor.png" alt="Médaille d'or" className="w-6 h-6" />
              <span>{_eventsWinner.firsts}</span>
            </div>
            <div className="flex mr-2">
              <img src="/medaille-dargent.png" alt="Médaille d'or" className="w-6 h-6" />
              <span>{_eventsWinner.seconds}</span>
            </div>
            <div className="flex mr-2">
              <img src="/medaille-de-bronze.png" alt="Médaille d'or" className="w-6 h-6" />
              <span>{_eventsWinner.thirds}</span>
            </div>
          </div>
        )}

        <Badge color="indigo" className="mr-3">
          {user.role}
        </Badge>
        <Dropdown inline label={<Avatar alt="User" img="/jetpack.png" rounded />} className="rounded-md" arrowIcon={false}>
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
          <Link to={"/profile"}>
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
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
