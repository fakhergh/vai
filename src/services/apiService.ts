import axios from 'axios';
import { LoginDto } from '@/interfaces';

const { BASE_URL } = process.env;

const client = axios.create({
  baseURL: BASE_URL || 'http://vai-api.eu-central-1.elasticbeanstalk.com/api',
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;

  return config;
});

export async function login(body: LoginDto) {
  const response = await client.post('/login', body);

  return response.data;
}
