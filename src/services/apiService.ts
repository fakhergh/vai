import axios from 'axios';

const { BASE_URL } = process.env;

const client = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;

  return config;
});
