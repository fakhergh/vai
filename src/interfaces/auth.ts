import { User } from '@/interfaces/user';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: User;
}
