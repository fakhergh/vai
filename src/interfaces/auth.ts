import { PatientGender, User } from '@/interfaces';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: PatientGender;
  birthdate: Date;
}

export interface AuthResponseData {
  token: string;
  user: User;
}
