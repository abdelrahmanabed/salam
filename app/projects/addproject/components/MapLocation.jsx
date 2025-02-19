// components/MapLocation.js
'use client'
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icon in Next.js
const icon = L.icon({
  iconUrl: '/marker.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Component to handle map clicks
const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      console.log(position)
      try {
        // استخدام Nominatim للحصول على العنوان (خدمة مجانية من OpenStreetMap)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const district = data.address.suburb || data.address.district || data.address.neighbourhood || '';
        const city = data.address.city || data.address.town || data.address.state || '';
        const country = data.address.country || '';

        // Combine the components, filtering out empty strings
        const formattedAddress = district+', '+ city+', '+ country
         
        const locationData = {
          type: 'Point',
          coordinates: [lng, lat],
          address: formattedAddress
        };
        
        onLocationSelect(locationData);
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
  });

  return position ? <Marker position={position} icon={icon} /> : null;
};

const MapLocation = ({ onLocationSelect }) => {
  // مركز مصر
  const defaultCenter = [30.0444, 31.2357];
  
  return (
    <div className=" border-4 border-maincolor h-[400px] rounded-main m-2 overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default MapLocation;