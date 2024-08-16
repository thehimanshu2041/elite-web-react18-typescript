import axios from 'axios';
import { ELITE_TOKEN } from '../model/elite';

const axiosUtils = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 60000,
});

axiosUtils.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ELITE_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

axiosUtils.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error(error);
        if (error.response?.status === 401) {
            console.error('Unauthorized!!!');
        }
        return Promise.reject(error);
    }
);


export default axiosUtils;
