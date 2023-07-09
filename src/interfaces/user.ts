export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updateAt: string;
}
