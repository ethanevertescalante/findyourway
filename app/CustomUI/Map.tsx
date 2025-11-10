'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import ButtonLayout from "@/app/CustomUI/Buttons/ButtonLayout";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {LoginButtons} from "@/app/CustomUI/Buttons/LoginButtons";


const Map = () => {
    return (
        <div className="relative w-screen h-screen m-0 p-0">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={10}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}
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
                            popupAnchor: [0, -30],
                        })
                    }
                >
                    <Popup closeOnEscapeKey={true}>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

            <div className="flex justify-end pt-4 pr-4">
                   <LoginButtons/>
                {/*<AvatarDropdown/>*/}
            </div>
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <ButtonLayout />
            </div>
        </div>
    );
};

//if you want the header on top, remove absolute in the div above
export default Map;
