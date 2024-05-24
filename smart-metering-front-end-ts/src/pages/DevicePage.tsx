//import { useParams } from "react-router-dom";
//import GaugeCard from "../components/dashboard/gauge/GaugeCard";
import GrafanaDashboard from "../components/dashboard/analytics/GrafanaDashboard";
import { useEffect } from "react";




export default function DevicePage(){
    //const params = useParams();
    useEffect(() => {
        const setupGrafana = async () => {
            try {
                await createOrUpdateDashboard();
            } catch (error) {
                console.error('Failed to setup Grafana:', error);
            }
        };

        setupGrafana();
    }, []);

    return <div>
        
        <GrafanaDashboard />
        {/** 
         * 
         <h1>Device id : {params.deviceId}</h1>
        <p><b>State :</b> active</p>
        <GaugeCard/>
        <Dashboard />
        
        <DeviceState />
        */}
        
    </div>
    
}

function createOrUpdateDashboard() {
    throw new Error("Function not implemented.");
}
