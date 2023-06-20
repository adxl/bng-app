import React from "react";
import { HiOutlineHome, HiOutlineMap, HiOutlineTruck, HiOutlineUserGroup } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCircleStack,
  HiOutlineClipboardDocumentList,
  HiOutlineExclamationTriangle,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";

import { ADMINISTRATOR, INSTRUCTOR, ORGANIZER, TECHNICIAN, USER } from "@typing/api/auth/users";

import Guard from "./SidebarGuard";

const { Items, ItemGroup, Item } = FlowbiteSidebar;

const Sidebar: React.FC = () => {
  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg">
      <Items>
        <Guard el={ItemGroup}>
          <Guard el={Item} link to="/" icon={HiOutlineHome}>
            Accueil
          </Guard>
          <Guard roles={[USER]} el={Item} link to="/stations" icon={HiOutlineMap}>
            Stations
          </Guard>
          <Guard roles={[USER]} el={Item} link to="/rides" icon={HiOutlineClipboardDocumentList}>
            Mes courses
          </Guard>
          <Guard roles={[USER]} el={Item} link to="/events" icon={HiOutlineCalendarDays}>
            Évènements
          </Guard>
        </Guard>

        <Guard roles={[ADMINISTRATOR, INSTRUCTOR, ORGANIZER, TECHNICIAN]} el={ItemGroup}>
          <Guard roles={[ADMINISTRATOR]} el={Item} link to="/admin/users" icon={HiOutlineUserGroup}>
            Utilisateurs
          </Guard>
          <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/rides" icon={HiOutlineRocketLaunch}>
            Courses
          </Guard>
          <Guard roles={[ADMINISTRATOR, TECHNICIAN, ORGANIZER]} el={Item} link to="/admin/stations" icon={HiOutlineTruck}>
            Stations
          </Guard>
          <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/vehicles" icon={HiOutlineTruck}>
            Véhicules
          </Guard>
          <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/reports" icon={HiOutlineExclamationTriangle}>
            Signalements
          </Guard>
          <Guard roles={[ADMINISTRATOR, INSTRUCTOR]} el={Item} link to="/admin/exams" icon={HiOutlineTruck}>
            Examens
          </Guard>
          <Guard roles={[ADMINISTRATOR, INSTRUCTOR]} el={Item} link to="/admin/candidates" icon={HiOutlineTruck}>
            Candidats
          </Guard>
          <Guard roles={[ADMINISTRATOR, ORGANIZER]} el={Item} link to="/admin/events" icon={HiOutlineTruck}>
            Évènements
          </Guard>
        </Guard>
      </Items>
    </FlowbiteSidebar>
  );
};

export default Sidebar;
