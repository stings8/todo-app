import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

export const isApiError = (error: Error) => error instanceof AxiosError;


export default api;
