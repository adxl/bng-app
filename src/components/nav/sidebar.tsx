import React from "react";
import { BiCar } from "react-icons/bi";
import { BsEvStation, BsMortarboard, BsPersonVcard } from "react-icons/bs";
import { HiMenu, HiOutlineHome, HiOutlineMap, HiOutlineUserGroup } from "react-icons/hi";
import {
  HiCalendarDays,
  HiOutlineCalendarDays,
  HiOutlineClipboardDocumentList,
  HiOutlineExclamationTriangle,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { TbJetpack } from "react-icons/tb";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { SidebarCollapse } from "flowbite-react/lib/esm/components/Sidebar/SidebarCollapse";

import { ADMINISTRATOR, INSTRUCTOR, ORGANIZER, TECHNICIAN, USER } from "@typing/api/auth/users";

import Guard from "./SidebarGuard";

const { Items, ItemGroup, Item } = FlowbiteSidebar;

const Sidebar: React.FC = () => {
  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg list-none list-inside w-full md:w-64 md:collapse-open">
      <SidebarCollapse icon={HiMenu} label="Menu">
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
            <Guard roles={[USER]} el={Item} link to="/licenses" icon={TbJetpack}>
              Mes permis
            </Guard>
          </Guard>

          <Guard roles={[ADMINISTRATOR, INSTRUCTOR, ORGANIZER, TECHNICIAN]} el={ItemGroup}>
            <Guard roles={[ADMINISTRATOR]} el={Item} link to="/admin/users" icon={HiOutlineUserGroup}>
              Utilisateurs
            </Guard>
            <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/rides" icon={HiOutlineRocketLaunch}>
              Courses
            </Guard>
            <Guard roles={[ADMINISTRATOR, TECHNICIAN, ORGANIZER]} el={Item} link to="/admin/stations" icon={BsEvStation}>
              Stations
            </Guard>
            <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/vehicles" icon={BiCar}>
              Véhicules
            </Guard>
            <Guard roles={[ADMINISTRATOR, TECHNICIAN]} el={Item} link to="/admin/reports" icon={HiOutlineExclamationTriangle}>
              Signalements
            </Guard>
            <Guard roles={[ADMINISTRATOR, INSTRUCTOR]} el={Item} link to="/admin/exams" icon={BsMortarboard}>
              Examens
            </Guard>
            <Guard roles={[ADMINISTRATOR, INSTRUCTOR]} el={Item} link to="/admin/candidates" icon={BsPersonVcard}>
              Candidats
            </Guard>
            <Guard roles={[ADMINISTRATOR, ORGANIZER]} el={Item} link to="/admin/events" icon={HiCalendarDays}>
              Évènements
            </Guard>
          </Guard>
        </Items>
      </SidebarCollapse>
    </FlowbiteSidebar>
  );
};

export default Sidebar;
