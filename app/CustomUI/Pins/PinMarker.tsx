// app/CustomUI/Pins/PinMarker.tsx
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L, { Icon, LeafletEvent } from "leaflet";
import type { Pin } from "../Map";
import getPinLocation from "@/app/CustomUI/Pins/getPinLocation";

type PinMarkerProps = {
    pin: Pin;
    icon: Icon;
    onUpdate: (updatedPin: Partial<Pin> & { id: string }) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
};

export function PinMarker({ pin, icon, onUpdate, onDelete }: PinMarkerProps) {
    const [position, setPosition] = useState<[number, number]>([pin.lat, pin.lng]);
    const [isEditingPos, setIsEditingPos] = useState(false);

    const [review, setReview] = useState(pin.review);
    const [cost, setCost] = useState(pin.cost);
    const [placeName, setPlaceName] = useState<string | null>(pin.location ?? null);

    // Keep local position and placeName in sync when pin changes from outside
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPosition([pin.lat, pin.lng]);
        let cancelled = false;
        (async () => {
            const name = await getPinLocation(pin.lat, pin.lng);
            if (!cancelled) {
                setPlaceName(name);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [pin.lat, pin.lng]);

    const handleDragEnd = (e: LeafletEvent) => {
        const marker = e.target as L.Marker;
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]); // local only, not DB yet
    };

    const handleSave = async () => {
        const [lat, lng] = position;

        await onUpdate({
            id: pin.id,
            lat,
            lng,
            review,
            cost,
            // location is computed server-side from lat/lng
        });

        setIsEditingPos(false);
    };

    const handleCancelEdit = () => {
        setPosition([pin.lat, pin.lng]);
        setIsEditingPos(false);
    };

    const handleStartEdit = () => {
        setIsEditingPos(true);
    };

    const handleDeleteMarker = async () => {
        await onDelete(pin.id);
    }


    return (
        <Marker
            key={pin.id}
            position={position}
            icon={icon}
            draggable={isEditingPos}
            eventHandlers={{
                dragend: handleDragEnd,
            }}
        >
            <Popup className="flex flex-col" minWidth={0} maxWidth={Infinity}>
                <div className="italic border-2 rounded-tl-2xl rounded-tr-2xl whitespace-nowrap highli bg-blue-400 text-white font-bold px-2 py-1">
                    {placeName}
                    <div className="text-[10px] text-gray-300">
                        ({position[0]}, {position[1]})
                    </div>
                </div>

                <div className="bg-green-400 text-white px-2 py-1 border-l-2 border-r-2 flex items-center gap-1">
                    <span className="font-bold italic">Cost:</span>

                    <div className="flex items-center">
                        <span>$</span>

                        {isEditingPos ? (
                            <input
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                className="bg-white w-fit rounded-2xl text-black px-1"
                            />
                        ) : (
                            <span className="text-nowrap">{cost}</span>
                        )}
                    </div>
                </div>


                <p className="font-bold italic border-2 text-white bg-purple-400 px-2 py-1">Comments:</p>
                <textarea
                    className={`${!isEditingPos ? "bg-gray-400 text-white" : "bg-white"} w-full border-l-2 border-r-2 border-b-2 rounded-br-2xl rounded-bl-2xl px-2 py-1`}
                    value={review}
                    rows={5}
                    disabled={!isEditingPos}
                    onChange={e => setReview(e.target.value)}
                />

                {!isEditingPos ? (
                    <div className="flex flex-row justify-between items-center">
                        <button className="underline text-blue-900 cursor-pointer bg-blue-300 rounded-full w-1/2 font-bold italic" onClick={handleStartEdit}>Edit Position/Content</button>
                        <button className="underline text-red-900 cursor-pointer bg-red-300 rounded-full w-1/3 font-bold italic" onClick={handleDeleteMarker}>Delete Marker</button>
                    </div>

                ) : (
                    <div className="flex flex-row justify-between items-center">
                        <button className="underline text-blue-900 cursor-pointer bg-blue-300 rounded-full w-1/2 font-bold italic" onClick={handleSave}>Save/Lock Marker </button>
                        <button className="underline text-yellow-900 cursor-pointer bg-yellow-300 rounded-full w-1/3 font-bold italic" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                )}


            </Popup>
        </Marker>
    );
}
