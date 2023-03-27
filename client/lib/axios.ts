import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  // timeout: 50000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // withCredentials: true,
});
instance.interceptors.response.use((response: AxiosResponse<any, any>) => {
  return response.data;
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
