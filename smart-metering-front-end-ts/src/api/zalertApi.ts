
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:53221'
});


export const generate_alert = async (): Promise<void> => {
    try {
        // Perform a GET request to the root endpoint
        const response = await axiosInstance.get(`/`);
        // Log the response data
        console.log('Response data:', response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
    }
};
