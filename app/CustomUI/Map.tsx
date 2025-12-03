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
import PinDirections from "@/app/CustomUI/PinDirections";
import DisplayTrip from "@/app/CustomUI/DisplayTrip";
import CreateTripName from "@/app/CustomUI/CreateTripName";
import SavedTripsPanel from "@/app/CustomUI/SavedTripsPanel";
import {PinMarker} from "@/app/CustomUI/Pins/PinMarker";
import {FitToTripBounds} from "@/app/CustomUI/FitToTripBounds";


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

export type Trip = {
    id: string;
    tripName: string;
    Pins: Pin[];
};

const Map = () => {
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


    const [pins, setPins] = useState<Pin[]>([]);
    const mapRef = useRef<LeafletMap | null>(null);
    const fetchPins = useCallback(async () => {
        const res = await fetch("/api/pins");
        const data = await res.json();
        setPins(data);
    }, []);


    const [trips, setTrips] = useState<Trip[]>([]);
    const fetchTrips = useCallback(async () => {
        const res = await fetch("/api/trips");
        if (!res.ok) return;
        const data = await res.json();
        setTrips(data);
    }, []);


    useEffect(() =>  {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPins().then(r => r);
        fetchTrips().then(r => r);
    }, [fetchPins, fetchTrips]);

    const [currentTripPins, setCurrentTripPins] = useState<Pin[]>([]);
    const [currentTripName, setCurrentTripName] = useState<string | null>(null);

    const [isCreateTripNameOpen, SetIsCreateTripNameOpen] = useState(false);
    const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
    const [isDisplayTripOpen, setIsDisplayTripOpen] = useState(false);

    console.log("tripname",currentTripName);
    console.log("currentTripPins",currentTripPins);


    type PinUpdate = Partial<Pin> & { id: string };
    const handleUpdatePin = async (updatedPin: PinUpdate) => {
        await fetch(`/api/pins/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPin),
        });

        setPins(prev => prev.map(pin => pin.id === updatedPin.id ? { ...pin, ...updatedPin } : pin));
    };
    const handleUpdateTrip = async (updatedTrip: Trip) => {
        await fetch(`/api/trips/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTrip),
        });

        setTrips(prev => prev.map(trip => trip.id === updatedTrip.id ? { ...trip, ...updatedTrip } : trip));
    };



    const waypoints = useMemo(
        () => currentTripPins.map(p => [p.lat, p.lng]),
        [currentTripPins]
    );


    console.log("waypoints",waypoints);

    const handleAddPin = async (data: PinFormData) => {
        await addPinAtCenter(mapRef.current, setPins, data);
        await new Promise(res => setTimeout(res, 1000));
        await fetchPins()
    };


    const handleAddTrip = async () => {
        await fetchTrips()
    };

    // const togglePinInTrip = (pinId: string) => {
    //     setCurrentTripPins(prev => {
    //         const exists = prev.some(p => p.id === pinId);
    //         if (exists) {
    //             return prev.filter(p => p.id !== pinId);
    //         }
    //         const pin = pins.find(p => p.id === pinId);
    //         if (!pin) return prev; // safety check
    //         return [...prev, pin];
    //     });
    // };
    //
    // const isInCurrentTrip = (pinId: string): boolean =>
    //     currentTripPins.some(p => p.id === pinId);


    const handleDeletePin = async (id: string) => {
        await fetch("/api/pins", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        setPins(prev => prev.filter(p => p.id !== id));
    };

    const handleDeleteTrip = async (id: string) => {
        await fetch("/api/trips", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        setTrips(prev => prev.filter(t => t.id !== id));
    };


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


    const clearCurrentTrip = () => {
        setCurrentTripPins([]);
    };

    const loadTrip = (tripId: string) => {
        const trip = trips.find(t => t.id === tripId);
        if (!trip) return;
        setCurrentTripName(trip.tripName);
        setCurrentTripPins(trip.Pins);
        setIsDisplayTripOpen(true);
        setIsSavedTripsOpen(false);
    };

    const handleTripNameCreated = (name: string) => {
        setCurrentTripName(name);
        setCurrentTripPins([]);              // start with an empty list of pins
        SetIsCreateTripNameOpen(false);      // close the name modal
        setIsDisplayTripOpen(true);          // open the DisplayTrip UI
    };

    const saveCurrentTripToList = async () => {
        // Optional guard:
        // if (!currentTripName || currentTripPins.length === 0) return;

        // 1. Check if this trip name already exists
        const existingTrip = trips.find(
            (t) => t.tripName === currentTripName
        );

        const pinIds = currentTripPins.map((p) => p.id);
        const isUpdate = Boolean(existingTrip);

        const method = isUpdate ? "PATCH" : "POST";

        const body: any = {
            tripName: currentTripName,
            pinIds,
        };

        if (isUpdate) {
            body.id = existingTrip!.id;
        }

        const res = await fetch("/api/trips", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            console.error("Failed to save trip");
            return;
        }

        const saved: Trip = await res.json();

        setTrips((prev) =>
            isUpdate
                ? prev.map((t) => (t.id === saved.id ? saved : t))
                : [saved, ...prev]
        );

        setIsDisplayTripOpen(false);
        setCurrentTripName(null);
        setCurrentTripPins([]);
    };





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
                                onToggleInTrip={togglePinInTrip}
                                isInCurrentTrip={isInCurrentTrip(pin)}
                                currentTripName={currentTripName}
                            />
                        ))}
                    </div>
                ) : (<p>you should not see this</p>)}

                {/* absolutely position the buttons at the bottom */}
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

                <FitToTripBounds pins={currentTripPins} />
                <PinDirections waypoints={waypoints} />

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

            {/*/!* Saved trips *!/*/}
            <SavedTripsPanel
                open={isSavedTripsOpen}
                trips={trips}
                onClose={() => setIsSavedTripsOpen(false)}
                onLoadTrip={loadTrip}
                onDeleteTrip={handleDeleteTrip}
            />
        </div>
    );
};

export default Map;
