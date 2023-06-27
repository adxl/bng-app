import type { UserRole } from "@typing/api/auth/users";

export type CreateDto = {
  firstName: string;

  lastName: string;

  email: string;

  role: string;
};

export type UpdatePasswordDto = {
  oldPwd: string;

  password: string;
};

export type UpdateProfileDto = {
  firstName?: string;

  lastName?: string;
};

export type UpdateRoleDto = {
  role: UserRole;
};
