import './map.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Import custom red marker image
import redMarkerIcon from '../../Assects/red-marker.png'; // Adjust the path based on your file structure

// Create a custom red marker icon
const redIcon = new L.Icon({
  iconUrl: redMarkerIcon,
  iconSize: [25, 25], // Size of the marker icon
  iconAnchor: [12, 41], // Anchor point of the marker
  popupAnchor: [1, -34], // Popup appears above the marker
});

function Map({ coordinates }) {
  const defaultPosition = [23.8041, 90.4152];
  const position = coordinates ? coordinates.split(',').map(Number) : defaultPosition;

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={redIcon}>
        <Popup>
          Gym Location: {position.join(', ')}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;


// import './map.scss';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';

// // Create a custom red marker icon
// const redIcon = new L.Icon({
//   //iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
//   iconUrl: 'https://w7.pngwing.com/pngs/453/571/png-transparent-location-marker-logo-picture-material-creative-logo-logo-image-thumbnail.png',  
//   iconSize: [25, 41], // Size of the icon
//   iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
//   popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41], // Size of the shadow
// });

// function Map({ coordinates }) {
//   const defaultPosition = [23.8041, 90.4152];
//   const position = coordinates ? coordinates.split(',').map(Number) : defaultPosition;

//   return (
//     <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="map">
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position} icon={redIcon}>
//         <Popup>
//           Gym Location: {position.join(', ')}
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// export default Map;


// import './map.scss';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';

// function Map({ coordinates }) {
//   // Default coordinates if none are provided
//   const defaultPosition = [23.8041, 90.4152];

//   // Parse the coordinates from the database
//   const position = coordinates ? coordinates.split(',').map(Number) : defaultPosition;

//   return (
//     <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="map">
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           Gym Location: {position.join(', ')}
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// export default Map;


// import './map.scss'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// function Map(){
//     return (
//         <MapContainer center={[23.8041, 90.4152]} zoom={10} scrollWheelZoom={false} className='map'>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[23.8041, 90.4152]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     )
// }

// export default Map