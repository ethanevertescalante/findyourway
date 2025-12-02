'use client'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon, IconOptions, Map as LeafletMap} from 'leaflet';
import ButtonLayout from "@/app/CustomUI/ButtonLayout";
import {useRef, useState, useMemo, useEffect, useCallback} from "react";
import SearchBar from './SearchBar';
import { addPinAtCenter } from "./Pins/AddPin";
import type { PinFormData } from "./Pins/PinMenu"
import HeaderAuth from "@/app/CustomUI/HeaderAuth";
import {PinMarker} from "@/app/CustomUI/Pins/PinMarker";

export type Pin = {
    id: string;
    lat: GLfloat;
    lng: GLfloat;
    location: string;
    review: string;
    cost: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    pinType: string;
    draggable: boolean;
};


const Map = () => {

    const [pins, setPins] = useState<Pin[]>([]);
    const mapRef = useRef<LeafletMap | null>(null);
    const fetchPins = useCallback(async () => {
        const res = await fetch("/api/pins");
        const data = await res.json();
        setPins(data);
    }, []);

    useEffect(() =>  {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPins().then(r => r);
    }, [fetchPins]);

    type PinUpdate = Partial<Pin> & { id: string };
    const handleUpdatePin = async (updatedPin: PinUpdate) => {
        await fetch(`/api/pins/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPin),
        });

        setPins(prev => prev.map(pin => pin.id === updatedPin.id ? { ...pin, ...updatedPin } : pin));
    };


    const visitedIcon = useMemo(
        () =>
            new Icon<IconOptions>({
                iconUrl: '/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -30],
            }),
        []
    );

    const wishIcon = useMemo(
        () =>
            new Icon<IconOptions>({
                iconUrl: '/marker-icon-wish.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -30],
            }),
        []
    );


    const handleAddPin = async (data: PinFormData) => {
        await addPinAtCenter(mapRef.current, setPins, data);
        await new Promise(res => setTimeout(res, 1000));
        await fetchPins()
    };

    const handleDeletePin = async (id: string) => {
        await fetch("/api/pins", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        setPins(prev => prev.filter(p => p.id !== id));
    };


    // const togglePinDraggable = (id: string) => {
    //     setPins(prev =>
    //         prev.map(p => (p.id === id ? { ...p, draggable: !p.draggable } : p))
    //     );
    // };


    return (

        <div className="relative w-screen h-screen m-0 p-0">
            <MapContainer
                keyboard={false}
                ref={mapRef}
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={false}
                doubleClickZoom={true}
                style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {Array.isArray(pins) ? (
                    <div>
                        {pins.map((pin) => (
                            <PinMarker
                                key={pin.id}
                                pin={pin}
                                icon={pin.pinType === "visited" ? visitedIcon : wishIcon}
                                onUpdate={handleUpdatePin}
                                onDelete={handleDeletePin}
                            />
                        ))}
                    </div>
                ) : (<p>you should not see this</p>)}

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
