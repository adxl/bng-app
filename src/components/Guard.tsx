import type { ElementType } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

import type { UserRole } from "@typing/api/users";

import { useAuth } from "../hooks/auth";

type Props = {
  el: ElementType;
  roles: Array<UserRole | "*">;
};

const Guard: React.FC<Props> = ({ el: Element, roles }) => {
  const { user, _token } = useAuth();

  if (!_token) return <Navigate to="/login" />;

  if (user.role && !roles.includes(user.role) && !roles.includes("*")) return <Navigate to="/home" />;

  return (
    <div>
      <Element />
    </div>
  );
};

export default Guard;
