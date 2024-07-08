import axiosInstance from './axiosInstance';

export interface CreateDeviceDto {
  id:string;
  serialNumber: string;
  locationX: string;
  locationY: string;
  dateType: string;
  dataType: string;
  dataUnit: string;
  codeSnippet:string;
}

export const createOrUpdateDevice = async (device: CreateDeviceDto) => {
  try {
    const response = await axiosInstance.post('/devices', device);
    console.log("response is :",response.data)
    return response.data; // Return the created or updated device
  } catch (error) {
    console.error('Error in createOrUpdateDevice:', error);
    throw error; // Optionally, rethrow to be handled by the component
  }
};


export const deleteDevice = async (serialNumber: string) => {
  try {
    const response = await axiosInstance.delete(`/devices/${serialNumber}`);
    return response.data; // Return any response data (e.g., a success message)
  } catch (error) {
    console.error('Error in deleteDevice:', error);
    throw error;
  }
};


export const fetchAllDevices = async ()=>{
  try{
    const response = await axiosInstance.get('/devices');
    return response.data
  } catch (error){
    console.error('Error in fetchAllDevices:', error);
    throw error; 
  }
}

export const fetchDeviceById = async (id: string):Promise<CreateDeviceDto> => {
  try {
      const response = await axiosInstance.get(`/devices/${id}`);
      const res:CreateDeviceDto= response.data;
      console.log("res == ",res);
      return res;
  } catch (error) {
      console.error('Error in fetchDeviceById:', error);
      throw error;
  }
};