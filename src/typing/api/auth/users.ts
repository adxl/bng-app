export const USER = "USER";
export const TECHNICIAN = "TECHNICIAN";
export const ORGANIZER = "ORGANIZER";
export const INSTRUCTOR = "INSTRUCTOR";
export const ADMINISTRATOR = "ADMINISTRATOR";

export type UserRole = typeof USER | typeof TECHNICIAN | typeof ORGANIZER | typeof INSTRUCTOR | typeof ADMINISTRATOR;

export type User = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole | null;
  createdAt: Date | null;
};
