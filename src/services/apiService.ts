import axios from 'axios';
import { CreateAppointmentDto, CreateDoctorDto, CreatePatientDto, LoginDto, RegisterDto, UpdateDoctorDto, UpdatePatientDto } from '@/interfaces';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const client = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL,
});

client.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token');

  return config;
});

/*
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      redirect(routes.auth.login);
    }
    return error;
  },
);
*/

export async function login(body: LoginDto) {
  const response = await client.post('/login', body);

  return response.data;
}

export async function register(body: RegisterDto) {
  const response = await client.post('/register', body);

  return response.data;
}

export async function fetchAppointments() {
  const response = await client.get('/appointments');

  return response.data;
}

export async function createAppointment(body: CreateAppointmentDto) {
  const response = await client.post('/appointments', body);

  return response.data;
}

export async function fetchDoctors() {
  const response = await client.get('/doctors');

  return response.data;
}

export async function createDoctor(body: CreateDoctorDto) {
  const response = await client.post('/doctors', body);

  return response.data;
}

export async function updateDoctor(id: string, body: UpdateDoctorDto) {
  const response = await client.put(`/doctors/${id}`, body);

  return response.data;
}

export async function deleteDoctor(id: string) {
  const response = await client.delete(`/doctors/${id}`);

  return response.data;
}

export async function fetchPatients() {
  const response = await client.get('/patients');

  return response.data;
}

export async function createPatient(body: CreatePatientDto) {
  const response = await client.post('/patients', body);

  return response.data;
}

export async function updatePatient(id: string, body: UpdatePatientDto) {
  const response = await client.put(`/patients/${id}`, body);

  return response.data;
}

export async function deletePatient(id: string) {
  const response = await client.delete(`/patients/${id}`);

  return response.data;
}
