import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@hooks/auth";
import type { UserRole } from "@typing/api/auth/users";

type Props = {
  roles?: UserRole[];
  el: any;
  link?: boolean;
  children: React.ReactNode;
} & Record<string, unknown>;

const SidebarGuard: React.FC<Props> = ({ roles = null, el: Element, children, link, ...props }) => {
  const { user } = useAuth();

  if (roles && (!user?.role || !roles.includes(user.role))) {
    return null;
  }

  return (
    <Element {...(link ? { as: Link } : {})} {...props}>
      {children}
    </Element>
  );
};

export default SidebarGuard;
