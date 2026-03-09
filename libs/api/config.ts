import axios from 'axios';

export const serverApi = process.env.SERVER_API_URL;

export const apiClient = axios.create({
    baseURL: serverApi,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // Add logic for tokens if needed
        // const token = Cookies.get('access_token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
