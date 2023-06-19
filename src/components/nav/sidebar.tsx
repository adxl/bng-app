import React from "react";
import { Link } from "react-router-dom";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";

import {
  CalendarDaysIcon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  MapIcon,
  RocketLaunchIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@hooks/auth";
import { ADMINISTRATOR, INSTRUCTOR, TECHNICIAN, USER } from "@typing/api/auth/users";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <Link to={"/"}>
            <FlowbiteSidebar.Item icon={HomeIcon}>
              <p>Accueil</p>
            </FlowbiteSidebar.Item>
          </Link>
          <Link to={"/stations"}>
            <FlowbiteSidebar.Item icon={MapIcon}>
              <p>Stations</p>
            </FlowbiteSidebar.Item>
          </Link>
          <Link to={"#"}>
            <FlowbiteSidebar.Item icon={CalendarDaysIcon}>
              <p>Évènements</p>
            </FlowbiteSidebar.Item>
          </Link>
          {user.role === USER && (
            <Link to={"#"}>
              <FlowbiteSidebar.Item icon={ClipboardDocumentListIcon}>
                <p>Mes passages</p>
              </FlowbiteSidebar.Item>
            </Link>
          )}
        </FlowbiteSidebar.ItemGroup>
        {user.role === ADMINISTRATOR && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Collapse icon={CircleStackIcon} label="Administration">
              <Link to={"#"}>
                <FlowbiteSidebar.Item icon={UserGroupIcon}>
                  <p>Utilisateurs</p>
                </FlowbiteSidebar.Item>
              </Link>
              <Link to={"#"}>
                <FlowbiteSidebar.Item icon={RocketLaunchIcon}>
                  <p>Courses</p>
                </FlowbiteSidebar.Item>
              </Link>
              <Link to={"#"}>
                <FlowbiteSidebar.Item icon={TruckIcon}>
                  <p>Véhicules</p>
                </FlowbiteSidebar.Item>
              </Link>
            </FlowbiteSidebar.Collapse>
          </FlowbiteSidebar.ItemGroup>
        )}
        {user.role === INSTRUCTOR && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item icon={ClipboardDocumentListIcon}>
              <p>Candidats</p>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        )}
        {user.role === TECHNICIAN && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item icon={ExclamationTriangleIcon}>
              <p>Signalements</p>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        )}
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

export default Sidebar;
