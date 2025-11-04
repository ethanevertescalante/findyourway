'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
/*
TODO:: the scrolling feels so janky because of two things happening at the same time
When you scroll is it both scrolling and tapping which causes it to "double scroll"
for now, I will disable trackpad scroll until we figure out a fix

update, it might be something else, not work looking at right now
For Now, I have disabled any zoom with trackpad, only zoom with buttons is allowed
 */
const Map = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={10}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[51.505, -0.09]}
                    icon={
                    new Icon({
                        // @ts-expect-error icon string issue, nothing to worry about
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor:[0,-30]}
                    )}
                >
                <Popup closeOnEscapeKey={true} >
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;