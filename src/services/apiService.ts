import axios from 'axios';
import { CreateAppointmentDto, LoginDto, RegisterDto } from '@/interfaces';

const { BASE_URL } = process.env;

const client = axios.create({
  baseURL: BASE_URL || 'http://vai-api.eu-central-1.elasticbeanstalk.com/api',
});

client.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token');

  return config;
});

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
