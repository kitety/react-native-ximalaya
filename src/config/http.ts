import axios from 'axios';

const axiosIns = axios.create({
  timeout: 60 * 1000,
  baseURL: 'http://192.168.0.8:40001/mock/11',
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
