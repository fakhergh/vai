import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/apiService';
import { LoginDto, Response, LoginResponseData } from '@/interfaces';

export function useLoginMutation() {
  return useMutation<Response<LoginResponseData>, AxiosError, LoginDto>({ mutationFn: (variables: LoginDto) => login(variables) });
}
