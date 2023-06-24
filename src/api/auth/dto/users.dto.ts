import type { UserRole } from "@typing/api/auth/users";

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
