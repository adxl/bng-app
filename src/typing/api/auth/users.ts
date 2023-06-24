export const USER = "USER";
export const TECHNICIAN = "TECHNICIAN";
export const ORGANIZER = "ORGANIZER";
export const INSTRUCTOR = "INSTRUCTOR";
export const ADMINISTRATOR = "ADMINISTRATOR";

export type UserRole = typeof USER | typeof TECHNICIAN | typeof ORGANIZER | typeof INSTRUCTOR | typeof ADMINISTRATOR;

export const RolesList: UserRole[] = [USER, TECHNICIAN, ORGANIZER, INSTRUCTOR, ADMINISTRATOR];

export type User = {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole | null;
  createdAt: Date | null;
};

// test if a user has the role
export const isUser = (user: User): boolean => user.role === USER;
export const isAdmin = (user: User): boolean => user.role === ADMINISTRATOR;
export const isTechnician = (user: User): boolean => user.role === TECHNICIAN;
export const isInstructor = (user: User): boolean => user.role === INSTRUCTOR;
export const isOrganizer = (user: User): boolean => user.role === ORGANIZER;

// test if the user has access to front/back office
export const hasFrontScope = (user: User): boolean => isUser(user);
export const hasBackScope = (user: User): boolean => isAdmin(user) || isTechnician(user) || isInstructor(user) || isOrganizer(user);
