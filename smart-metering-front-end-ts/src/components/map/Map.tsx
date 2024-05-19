import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, Icon, point } from "leaflet";
// import WMTSTileLayer from 'react-leaflet-wmts';
type Location = {
  coords: [number, number];
  text: string;
};


const locations:Location[] = [
  {
    coords: [46.7633, 23.586267],
    text: "Point 1"
  },
  {
    coords: [46.770955, 23.589996],
    text: "Point 2"
  },
  {
    coords: [46.76957, 23.59241],
    text: "Point 3"
  },
  {
    coords: [46.763369, 23.559224],
    text: "Point 4"
  }
];

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
            <Popup> {marker.text} </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
