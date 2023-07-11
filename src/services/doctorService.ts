import { useQuery } from '@tanstack/react-query';
import { fetchDoctors } from '@/services/apiService';
import { AxiosError } from 'axios';
import { Doctor, Response } from '@/interfaces';

export function useDoctorsQuery() {
  return useQuery<Response<Array<Doctor>>, AxiosError>({ queryKey: ['doctors'], queryFn: () => fetchDoctors() });
}
