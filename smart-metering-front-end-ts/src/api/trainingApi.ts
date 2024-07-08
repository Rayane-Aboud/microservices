
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001'
});


export const train = async (source:string): Promise<void> => {
    try {
        // Perform a GET request to the root endpoint
        console.log(source);
        const response = await axiosInstance.get(`/load_from_mongo?source=${source}`);
        // Log the response data
        console.log('Response data:', response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
    }
};
