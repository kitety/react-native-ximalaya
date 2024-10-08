import axios from 'axios';

console.log('process.env.EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL);

const axiosIns = axios.create({
  timeout: 60 * 1000,
  baseURL: process.env.EXPO_PUBLIC_API_URL!,
});

// 请求拦截器
axiosIns.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosIns.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosIns;
