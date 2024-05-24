//import { useParams } from "react-router-dom";
//import GaugeCard from "../components/dashboard/gauge/GaugeCard";
import GrafanaDashboard from "../components/dashboard/analytics/GrafanaDashboard";

export default function DevicePage(){
  //  const params = useParams();

    return <div>
        
        <GrafanaDashboard />
        {/** 
        <Dashboard />
        <h1>Device id : {params.deviceId}</h1>
        <p><b>State :</b> active</p>
        <GaugeCard/>
        <DeviceState />
        */}
        
    </div>
    
}