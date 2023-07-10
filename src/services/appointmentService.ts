import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchAppointments } from '@/services/apiService';
import { Appointment, Response } from '@/interfaces';

export function useAppointmentsQuery() {
  return useQuery<Response<Array<Appointment>>, AxiosError>({
    queryKey: ['appointments'],
    queryFn: () => fetchAppointments(),
  });
}
