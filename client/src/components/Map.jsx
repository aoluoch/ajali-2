import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Default icon for the marker (fix for missing icon issue in Leaflet)
const defaultIcon = new Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const Map = ({ latitude, longitude, zoom = 13, title }) => {
  const [position, setPosition] = useState([latitude, longitude])

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude])
    }
  }, [latitude, longitude])

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={defaultIcon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
