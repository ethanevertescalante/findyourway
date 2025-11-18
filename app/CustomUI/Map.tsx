'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, Map as LeafletMap, LatLng } from 'leaflet';
import ButtonLayout from "@/app/CustomUI/ButtonLayout";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {useRef, useState, useMemo, useEffect, useCallback} from "react";
import SearchBar from './SearchBar';
import { addPinAtCenter } from "./AddPin";
import type { PinFormData } from "./PinMenu"



export type Pin = {
    id: string;
    position: [number, number]; //lat + lng
    location: string;
    review: string;
    cost: string; // e.g., USD
    draggable: boolean;
};

import {LoginButtons} from "@/app/CustomUI/Buttons/LoginButtons";
import HeaderAuth from "@/app/CustomUI/HeaderAuth";



const Map = () => {

    const [pins, setPins] = useState<Pin[]>([]);
    const mapRef = useRef<LeafletMap | null>(null);

    const leafletIcon = useMemo(() =>
            new Icon({
                // @ts-expect-error Next asset import is fine at runtime
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -30],
            }),
        []
    );

    const handleAddPin = (data: PinFormData) => {
        addPinAtCenter(mapRef.current, setPins, data);
    };


    const togglePinDraggable = (id: string) => {
        setPins(prev =>
            prev.map(p => (p.id === id ? { ...p, draggable: !p.draggable } : p))
        );
    };




    return (

        <div className="relative w-screen h-screen m-0 p-0">
            <MapContainer
                keyboard={false}
                ref={mapRef}
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


                {/* Place the pins on the map */}
                {pins.map((pin) => (
                    <Marker key={pin.id} position={pin.position} icon={leafletIcon} draggable={pin.draggable}>
                        <Popup minWidth={30}>
                            <strong>{pin.location}</strong><br />
                            {`Review: ${pin.review}`}<br />
                            {`Cost: $${pin.cost}`}

                            <div style={{ marginTop: 8 }}>
                                <span onClick={() => togglePinDraggable(pin.id)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    {pin.draggable ? 'Lock Pin' : 'Unlock Pin'}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}


            {/* absolutely position the buttons at the bottom */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center z-[650] pointer-events-none">
                    <div className="flex flex-row items-center pointer-events-auto">
                        <SearchBar />
                        <ButtonLayout onAddPin={handleAddPin} />
                    </div>
                </div>


        </MapContainer>
        <HeaderAuth/>



        </div>
    );
};


//if you want the header on top, remove absolute in the div above
export default Map;
