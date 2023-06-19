import type { ElementType } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

import Navbar from "@components/nav/navbar";
import Sidebar from "@components/nav/sidebar";
import type { UserRole } from "@typing/api/users";

import { useAuth } from "../hooks/auth";

type Props = {
  el: ElementType;
  roles: Array<UserRole | "*">;
};

const Guard: React.FC<Props> = ({ el: Element, roles }) => {
  const { user, _token } = useAuth();

  if (!_token) return <Navigate to="/login" />;

  if (user.role && !roles.includes(user.role) && !roles.includes("*")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div>
          <Element />
        </div>
      </div>
    </div>
  );
};

export default Guard;
