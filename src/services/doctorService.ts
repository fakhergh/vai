import { useMutation, useQuery } from '@tanstack/react-query';
import { createDoctor, deleteDoctor, fetchDoctors, updateDoctor } from '@/services/apiService';
import { AxiosError } from 'axios';
import { CreateDoctorDto, Doctor, UpdateDoctorDto, Response } from '@/interfaces';
import { queryClient } from '@/queryClient';

export function useDoctorsQuery() {
  return useQuery<Response<Array<Doctor>>, AxiosError>({ queryKey: ['doctors'], queryFn: () => fetchDoctors() });
}

export function useCreateDoctorMutation() {
  return useMutation<Response<Doctor>, AxiosError, CreateDoctorDto>({
    mutationKey: ['createDoctor'],
    mutationFn: (data: CreateDoctorDto) => createDoctor(data),
    onSuccess: data => {
      queryClient.setQueryData<any>(['doctors'], (prev: Response<Array<Doctor>>) => ({
        ...prev,
        data: [data.data, ...prev?.data],
      }));
    },
  });
}

export function useUpdateDoctorMutation(id: string) {
  return useMutation<Response<Doctor>, AxiosError, UpdateDoctorDto>({
    mutationKey: ['updateDoctor'],
    mutationFn: (data: UpdateDoctorDto) => updateDoctor(id, data),
    onSuccess: data => {
      queryClient.setQueryData<any>(['doctors'], (prev: Response<Array<Doctor>>) => ({
        ...prev,
        data: prev?.data.map((doctor: Doctor) => {
          if (doctor._id === data.data._id) data.data;
          return doctor;
        }),
      }));
    },
  });
}

export function useDeleteDoctorMutation() {
  return useMutation<Response<Doctor>, AxiosError, string>({
    mutationKey: ['deleteDoctor'],
    mutationFn: (id: string) => deleteDoctor(id),
    onSuccess: data => {
      queryClient.setQueryData<any>(['doctors'], (prev: Response<Array<Doctor>>) => ({
        ...prev,
        data: prev?.data.filter((doctor: Doctor) => doctor._id !== data.data._id),
      }));
    },
  });
}
