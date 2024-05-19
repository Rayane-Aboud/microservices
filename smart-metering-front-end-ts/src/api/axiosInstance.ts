import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'http://localhost:9669'
});

export default axiosInstance;
