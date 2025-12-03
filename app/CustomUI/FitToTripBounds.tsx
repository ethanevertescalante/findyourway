// FitToTripBounds.tsx
"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { Pin } from "./Map"; // whatever your Pin type is

type Props = {
    pins: Pin[];
};

export function FitToTripBounds({ pins }: Props) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (!pins || pins.length === 0) return;

        if (pins.length === 1) {
            // Single pin: just center on it with a nice zoom
            const p = pins[0];
            map.setView([p.lat, p.lng], 15); // tweak zoom as you like
            return;
        }

        // Multiple pins: fit bounds
        const bounds = L.latLngBounds(
            pins.map((p) => [p.lat, p.lng] as [number, number])
        );

        map.fitBounds(bounds, {
            padding: [200, 200], // some padding so markers aren’t at the edge
        });
    }, [map, pins]);

    return null;
}
