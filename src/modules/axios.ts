import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default axiosInstance;
