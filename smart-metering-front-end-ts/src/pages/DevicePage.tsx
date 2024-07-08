//import { useParams } from "react-router-dom";
//import GaugeCard from "../components/dashboard/gauge/GaugeCard";
import GrafanaDashboard from "../components/dashboard/analytics/GrafanaDashboard";
import { useEffect, useState } from "react";
import IdeWithAutoComplete from "../components/dashboard/codeEditor/IdeWithAutoComplete";

import { useParams } from "react-router-dom";
import { createOrUpdateDashboard } from "../api/grafanaApi";
import { forecast } from "../api/inferenceApi";
import { train } from "../api/trainingApi";
import { CreateDeviceDto, fetchDeviceById } from "../api/devicesApi";
import axios from "axios";


const axiosAlertInstance = axios.create({
    baseURL: 'http://localhost:53221'
});

// Function to generate alert and update the state
export const generate_alert = async (serial_number:string|undefined,setAlertMessage: (message: string) => void): Promise<void> => {
    try {
        const response = await axiosAlertInstance.get(`/${serial_number}`);
        const { deviation_mean, criterion_result } = response.data;
        setAlertMessage(`Deviation Mean: ${deviation_mean}, Criterion Result: ${criterion_result}`);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        setAlertMessage('Error generating alert');
    }
};




export default function DevicePage(){
    
    
    const { deviceId } = useParams<{ deviceId: string }>();
    const [device,setDevice] = useState<CreateDeviceDto>();
    const [alertMessage, setAlertMessage] = useState<string>("");
    //console.log("Babboune Bouchra");
    useEffect(() => {
        const setupGrafana = async () => {
            try {
                await createOrUpdateDashboard(deviceId);
            } catch (error) {
                console.error('Failed to setup Grafana:', error);
            }
        };
        
        const fetchData = async () => {
            try {
                console.log("the device id is",deviceId)
                if (deviceId) {
                    const fetchedDevice = await fetchDeviceById(deviceId);
                    const ddto : CreateDeviceDto = {
                        id:fetchedDevice.id,
                        serialNumber:fetchedDevice.serialNumber,
                        locationX:fetchedDevice.locationX,
                        locationY:fetchedDevice.locationY,
                        dateType:fetchedDevice.dateType,
                        dataType:fetchedDevice.dataType,
                        dataUnit:fetchedDevice.dataUnit,
                        codeSnippet:fetchedDevice.codeSnippet
                    };
                    
                    setDevice(ddto);
                    console.log("AFTER THE AFFECTATION",device?.dataUnit)
                    
                } else {
                    throw new Error('Device ID is undefined');
                }
            } catch (error) {
                console.error('Failed to fetch device by ID:', error);
            }
        };

        fetchData();
        console.log(device)
        setupGrafana();
        
    }, []);

    return <>
        
        <GrafanaDashboard />
        <div id="buttons" className="flex justify-around">
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={forecast}
            >Forcast</button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => generate_alert(device?.serialNumber,setAlertMessage)}
            >Generate Alert</button>
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={()=>{console.log(device);return device?train(device.dataUnit):null}}
            >Retrain</button>
        </div>
         
        <IdeWithAutoComplete serialNumber={device?.serialNumber} codeSnippet={device?.codeSnippet} />
        {alertMessage && <div className="alert-message">{alertMessage}</div>}
        {/** 
         * 
         <h1>Device id : {params.deviceId}</h1>
        <p><b>State :</b> active</p>
        <GaugeCard/>
        <Dashboard />
        
        <DeviceState />
        */}
        
    </>
    
}

