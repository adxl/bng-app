import React from "react";
import { Link } from "react-router-dom";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";

import { CalendarDaysIcon, MapIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@hooks/auth";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <FlowbiteSidebar className="mr-5 shadow-lg rounded-lg">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <Link to={"/stations"}>
            <FlowbiteSidebar.Item icon={MapIcon}>
              <p>Stations</p>
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item icon={CalendarDaysIcon}>
              <p>Évènements</p>
            </FlowbiteSidebar.Item>
          </Link>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

export default Sidebar;
