'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, Map as LeafletMap } from 'leaflet';
import ButtonLayout from "@/app/CustomUI/ButtonLayout";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {useRef, useState, useMemo, useEffect} from "react";
import SearchBar from './SearchBar';
import { addPinAtCenter } from "./Pins/AddPin";
import type { PinFormData } from "./Pins/PinMenu"
import HeaderAuth from "@/app/CustomUI/HeaderAuth";
import PinDirections from "@/app/CustomUI/PinDirections";
import DisplayTrip from "@/app/CustomUI/DisplayTrip";
import CreateTripName from "@/app/CustomUI/CreateTripName";
import SavedTripsPanel from "@/app/CustomUI/SavedTripsPanel";


export type Pin = {
    id: string;
    position: [number, number]; //lat + lng
    location: string;
    review: string;
    cost: string; // e.g., USD
    draggable: boolean;
};

export type Trip = {
    id: string;
    name: string;
    pins: Pin[];
};


const Map = () => {
    const mapRef = useRef<LeafletMap | null>(null);

    const [pins, setPins] = useState<Pin[]>([]);

    const [currentTripPins, setCurrentTripPins] = useState<Pin[]>([]);
    const [currentTripName, setCurrentTripName] = useState<string | null>(null);

    const [isCreateTripNameOpen, SetIsCreateTripNameOpen] = useState(false);
    const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
    const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
    const [isDisplayTripOpen, setIsDisplayTripOpen] = useState(false);



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

    const waypoints = useMemo(
        () => currentTripPins.map(p => p.position),
        [currentTripPins]
    );

    const handleAddPin = (data: PinFormData) => {
        addPinAtCenter(mapRef.current, setPins, data);
    };


    const togglePinDraggable = (id: string) => {
        setPins(prev =>
            prev.map(p => (p.id === id ? { ...p, draggable: !p.draggable } : p))
        );
    };

    /*
    const handleTrip = (pin: Pin) => {
        setPinsForTrip(prevPins => {
            const exists = prevPins.some(p => p.id === pin.id);

            if (exists) {
                // remove it
                return prevPins.filter(p => p.id !== pin.id);
            }

            // add it
            return [...prevPins, pin];
        });
    };

    const existsInTrip = (pinToCheck: Pin): boolean => {

        for (const pin of pinsForTrip) {
            if (pin.id === pinToCheck.id) {
                return true;
            }
        }
        return false;
    };

     */


    const togglePinInTrip = (pin: Pin) => {
        setCurrentTripPins(prev => {
            const exists = prev.some(p => p.id === pin.id);
            if (exists) {
                return prev.filter(p => p.id !== pin.id);
            }
            return [...prev, pin];
        });
    };

    const isInCurrentTrip = (pin: Pin): boolean =>
        currentTripPins.some(p => p.id === pin.id);


    // 💾 save current trip
    const saveCurrentTrip = (name: string) => {
        if (!currentTripPins.length) return;

        const newTrip: Trip = {
            id: crypto.randomUUID(), // or Date.now().toString()
            name,
            pins: currentTripPins,
        };

        setSavedTrips(prev => [...prev, newTrip]);
    };

    const clearCurrentTrip = () => {
        setCurrentTripPins([]);
    };

    const loadTrip = (tripId: string) => {
        const trip = savedTrips.find(t => t.id === tripId);
        if (!trip) return;
        setCurrentTripName(trip.name);
        setCurrentTripPins(trip.pins);
        setIsDisplayTripOpen(true);
        setIsSavedTripsOpen(false);
        deleteTrip(tripId);
    };

    const deleteTrip = (tripId: string) => {
        setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    };

    const saveCurrentTripToList = () => {
        if (!currentTripName || currentTripPins.length === 0) return;

        const newTrip: Trip = {
            id: crypto.randomUUID(),
            name: currentTripName,
            pins: currentTripPins,
        };

        setSavedTrips(prev => [...prev, newTrip]);
        clearCurrentTrip();
    };


    const handleTripNameCreated = (name: string) => {
        setCurrentTripName(name);
        setCurrentTripPins([]);      // start fresh for this trip
        SetIsCreateTripNameOpen(false);
    };


    /*
        // persist saved trips in localStorage
        useEffect(() => {
            if (typeof window === "undefined") return;
            const raw = localStorage.getItem("savedTrips");
            if (raw) {
                try {
                    setSavedTrips(JSON.parse(raw));
                } catch {
                    // ignore parse errors
                }
            }
        }, []);

        useEffect(() => {
            if (typeof window === "undefined") return;
            localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
        }, [savedTrips]);
    */




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
                                <span>
                                    { ' '}
                                </span>
                                <span
                                    onClick={() => togglePinInTrip(pin)}
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {isDisplayTripOpen && (!isInCurrentTrip(pin) ? "Add to trip" : "Remove from trip")}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Route between pins in current trip */}
                <PinDirections waypoints={waypoints} />

                {/* bottom buttons */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center z-[650] pointer-events-none">
                    <div className="flex flex-row items-center pointer-events-auto">
                        <SearchBar />
                        <ButtonLayout
                            onAddPin={handleAddPin}
                            onOpenTripBuilder={() => SetIsCreateTripNameOpen(true)}
                            onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
                        />
                    </div>
                </div>



            </MapContainer>

            <HeaderAuth />


            <DisplayTrip
                open={isDisplayTripOpen}
                name={currentTripName}
                pins={currentTripPins}
                onSaveTrip={saveCurrentTripToList}
                onClearTrip={clearCurrentTrip}
                onClose={() => setIsDisplayTripOpen(false)}
            />

            {/* Trip name */}
            <CreateTripName
                open={isCreateTripNameOpen}
                onClose={() => SetIsCreateTripNameOpen(false)}
                onSaveName={handleTripNameCreated}
                onSave2={() => setIsDisplayTripOpen(true)}
            />

            {/* Saved trips */}
            <SavedTripsPanel
                open={isSavedTripsOpen}
                trips={savedTrips}
                onClose={() => setIsSavedTripsOpen(false)}
                onLoadTrip={loadTrip}
                onDeleteTrip={deleteTrip}
            />
        </div>
    );
};

export default Map;
