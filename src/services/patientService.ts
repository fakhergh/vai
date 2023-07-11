import { useMutation, useQuery } from '@tanstack/react-query';
import { createPatient, deletePatient, fetchPatients, updatePatient } from '@/services/apiService';
import { CreatePatientDto, Patient, Response, UpdatePatientDto } from '@/interfaces';
import { AxiosError } from 'axios';
import { queryClient } from '@/queryClient';

export function usePatientsQuery() {
  return useQuery<Response<Array<Patient>>, AxiosError>({
    queryKey: ['patients'],
    queryFn: () => fetchPatients(),
  });
}

export function useCreatePatientMutation() {
  return useMutation<Response<Patient>, AxiosError, CreatePatientDto>({
    mutationKey: ['createPatient'],
    mutationFn: (data: CreatePatientDto) => createPatient(data),
  });
}

export function useUpdatePatientMutation(id: string) {
  return useMutation<Response<Patient>, AxiosError, UpdatePatientDto>({
    mutationKey: ['updatePatient'],
    mutationFn: (data: UpdatePatientDto) => updatePatient(id, data),
    onSuccess: data => {
      queryClient.setQueryData<any>(['patients'], (prev: Response<Array<Patient>>) => ({
        ...prev,
        data: prev?.data.map((patient: Patient) => {
          if (patient._id === data.data._id) return data.data;
          return patient;
        }),
      }));
    },
  });
}

export function useDeletePatientMutation() {
  return useMutation<Response<Patient>, AxiosError, string>({
    mutationKey: ['deletePatient'],
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: data => {
      queryClient.setQueryData<any>(['patients'], (prev: Response<Array<Patient>>) => ({
        ...prev,
        data: prev?.data.filter((patient: Patient) => patient._id !== data.data._id),
      }));
    },
  });
}
