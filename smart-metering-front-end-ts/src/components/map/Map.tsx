import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, Icon, point } from "leaflet";
import { useEffect, useState } from "react";
import { CreateDeviceDto, fetchAllDevices } from "../../api/devicesApi";
import { Link } from "react-router-dom";
// import WMTSTileLayer from 'react-leaflet-wmts';
type Location = {
  coords: [number, number];
  text: string;
};



const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [38, 38],
});


const createClusterCustomIcon = (cluster: any):DivIcon => {
  return new DivIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};


export default function Map() {

  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devices = await fetchAllDevices();
        const mappedLocations = devices.map((device: CreateDeviceDto) => ({
          coords: [device.locationX, device.locationY],
          text: device.serialNumber, // Use serialNumber as the text for the popup
        }));
        setLocations(mappedLocations);
      } catch (error) {
        console.error("Error loading devices:", error);
      }
    };

    loadDevices();
  }, []);


  return (
    <MapContainer className="z-10" center={[46.7693, 23.5894]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {locations.map((marker) => (
          <Marker position={marker.coords} icon={customIcon}>
            <Popup> 
              <Link to={`/devices/${marker.text}`}>
                {marker.text} 
              </Link>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
