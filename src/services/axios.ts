import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
