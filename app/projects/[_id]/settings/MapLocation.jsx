'use client'
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icon in Next.js
const icon = L.icon({
  iconUrl: '/marker.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Component to handle map center updates
const MapController = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
};

// Component to handle map clicks and marker position
const LocationMarker = ({ onLocationSelect, initialLocation }) => {
  const [position, setPosition] = useState(initialLocation ? [initialLocation.lat, initialLocation.lng] : null);
  
  useEffect(() => {
    if (initialLocation && !position) {
      setPosition([initialLocation.lat, initialLocation.lng]);
      // Notify parent component of initial location
      handleLocationUpdate(initialLocation.lat, initialLocation.lng);
    }
  }, [initialLocation]);

  const handleLocationUpdate = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      const district = data.address.suburb || data.address.district || data.address.neighbourhood || '';
      const city = data.address.city || data.address.town || data.address.state || '';
      const country = data.address.country || '';
      
      const formattedAddress = [district, city, country].filter(Boolean).join(', ');
      
      const locationData = {
        type: 'Point',
        coordinates: [lng, lat], // GeoJSON uses [longitude, latitude]
        address: formattedAddress
      };
      
      onLocationSelect(locationData);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      handleLocationUpdate(lat, lng);
    }
  });

  return position ? <Marker position={position} icon={icon} /> : null;
};

const MapLocation = ({ onLocationSelect, initialLocation }) => {
  // Default center (Egypt)
  const defaultCenter = [30.0444, 31.2357];
  const center = initialLocation ? [initialLocation.lat, initialLocation.lng] : defaultCenter;
  
  return (
    <div className="border-4 border-maincolor h-[400px] rounded-main m-2 overflow-hidden">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController center={center} />
        <LocationMarker 
          onLocationSelect={onLocationSelect} 
          initialLocation={initialLocation}
        />
      </MapContainer>
    </div>
  );
};

export default MapLocation