import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAppointment, fetchAppointments } from '@/services/apiService';
import { Appointment, CreateAppointmentDto, Response } from '@/interfaces';
import { queryClient } from '@/queryClient';

export function useAppointmentsQuery() {
  return useQuery<Response<Array<Appointment>>, AxiosError>({
    queryKey: ['appointments'],
    queryFn: () => fetchAppointments(),
  });
}

export function useCreateAppointmentMutation() {
  return useMutation<Response<Appointment>, AxiosError, CreateAppointmentDto>({
    mutationKey: ['create-appointment'],
    mutationFn: (data: CreateAppointmentDto) => createAppointment(data),
    onSuccess: data => {
      queryClient.setQueryData<any>(['appointments'], (prev: Response<Array<Appointment>>) => ({
        ...prev,
        data: [data.data, ...prev?.data],
      }));
    },
  });
}
