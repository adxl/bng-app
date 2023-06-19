import React from "react";
import { HiOutlineHome, HiOutlineMap, HiOutlineTruck, HiOutlineUserGroup } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCircleStack,
  HiOutlineClipboardDocumentList,
  HiOutlineExclamationTriangle,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";

import { useAuth } from "@hooks/auth";
import { ADMINISTRATOR, INSTRUCTOR, TECHNICIAN, USER } from "@typing/api/auth/users";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item as={Link} to="/" icon={HiOutlineHome}>
            <p>Accueil</p>
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item as={Link} to="/stations" icon={HiOutlineMap}>
            <p>Stations</p>
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineCalendarDays}>
            <p>Évènements</p>
          </FlowbiteSidebar.Item>
          {user.role === USER && (
            <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineClipboardDocumentList}>
              <p>Mes passages</p>
            </FlowbiteSidebar.Item>
          )}
        </FlowbiteSidebar.ItemGroup>
        {user.role === ADMINISTRATOR && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Collapse icon={HiOutlineCircleStack} label="Administration">
              <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineUserGroup}>
                <p>Utilisateurs</p>
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineRocketLaunch}>
                <p>Courses</p>
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineTruck}>
                <p>Véhicules</p>
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.Collapse>
          </FlowbiteSidebar.ItemGroup>
        )}
        {user.role === INSTRUCTOR && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineClipboardDocumentList}>
              <p>Candidats</p>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        )}
        {user.role === TECHNICIAN && (
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item as={Link} to="#" icon={HiOutlineExclamationTriangle}>
              <p>Signalements</p>
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        )}
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

export default Sidebar;
