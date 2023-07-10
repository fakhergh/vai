import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/services/apiService';
import { LoginDto, Response, AuthResponseData, RegisterDto } from '@/interfaces';

export function useLoginMutation() {
  return useMutation<Response<AuthResponseData>, AxiosError, LoginDto>({ mutationFn: (variables: LoginDto) => login(variables) });
}

export function useRegisterMutation() {
  return useMutation<Response<AuthResponseData>, AxiosError, RegisterDto>({ mutationFn: (variables: RegisterDto) => register(variables) });
}
