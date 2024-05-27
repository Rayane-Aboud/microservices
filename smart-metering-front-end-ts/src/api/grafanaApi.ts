import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:53222'
});

export const createOrUpdateDashboard = async (deviceId: string | undefined) => {
    console.log(deviceId);
    try {
        const payload = {
            device_id: deviceId  // Correct the payload key to match the FastAPI model
        };

        const response = await axiosInstance.post('/dashboard/', payload);
        console.log("Response:", response.data);
        return response.data; // Return the data received from the backend
    } catch (error) {
        console.error('Error in createOrUpdateDashboard:', error);
        throw error; // Optionally, rethrow to be handled by the caller
    }
};
