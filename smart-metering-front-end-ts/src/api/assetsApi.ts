import axiosInstance from './axiosInstance';

interface CreateAssetTreeDto{
    name: string;
    children: CreateAssetTreeDto[];
}

export const getAssets = async () => {
    const response = await axiosInstance.get('/assets');
    console.log(response.data)
    return response.data;
};
  
  
export const updateAssetsTree = async (createAssetTreeDto: CreateAssetTreeDto) => {
    const response = await axiosInstance.post('/assets/update', createAssetTreeDto);
    return response.data;
};