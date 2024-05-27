//import { useParams } from "react-router-dom";
//import GaugeCard from "../components/dashboard/gauge/GaugeCard";
import GrafanaDashboard from "../components/dashboard/analytics/GrafanaDashboard";
import { useEffect } from "react";
import IdeWithAutoComplete from "../components/dashboard/codeEditor/IdeWithAutoComplete";

import { useParams } from "react-router-dom";
import { createOrUpdateDashboard } from "../api/grafanaApi";



export default function DevicePage(){
    
    
    const { deviceId } = useParams<{ deviceId: string }>();

    console.log("Babboune Bouchra");
    useEffect(() => {
        const setupGrafana = async () => {
            try {
                await createOrUpdateDashboard(deviceId);
            } catch (error) {
                console.error('Failed to setup Grafana:', error);
            }
        };



        setupGrafana();
    }, []);

    return <>
        
        <GrafanaDashboard />
        
        <IdeWithAutoComplete />
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

