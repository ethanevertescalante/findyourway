// app/CustomUI/Pins/PinMarker.tsx
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L, { Icon, LeafletEvent } from "leaflet";
import type { Pin } from "../Map";
import getPinLocation from "@/app/CustomUI/Pins/getPinLocation";

type PinMarkerProps = {
    pin: Pin;
    icon: Icon;
    onUpdate: (updated: Partial<Pin> & { id: string }) => Promise<void>;
};

export function PinMarker({ pin, icon, onUpdate }: PinMarkerProps) {
    const [position, setPosition] = useState<[number, number]>([pin.lat, pin.lng]);
    const [isEditingPos, setIsEditingPos] = useState(false);

    const [review, setReview] = useState(pin.review);
    const [cost, setCost] = useState(pin.cost);
    const [placeName, setPlaceName] = useState<string | null>(pin.location ?? null);

    // Keep local position and placeName in sync when pin changes from outside
    useEffect(() => {
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
            <Popup minWidth={500}>
                <strong>{placeName || `${position[0]}, ${position[1]}`}</strong>
                <br />
                <label>
                    Review:
                    <br />
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={3}
                        style={{ width: "100%" }}
                    />
                </label>
                <br />
                <label>
                    Cost:
                    <br />
                    <input
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </label>

                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    {!isEditingPos ? (
                        <button onClick={handleStartEdit}>Edit position</button>
                    ) : (
                        <>
                            <button onClick={handleSave}>Save / Lock</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}
