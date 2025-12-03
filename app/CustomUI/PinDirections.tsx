'use client';

import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

type PinDirectionsProps = {
    waypoints: number[][];
};

// Minimal TS interface for leaflet-routing-machine control
interface RoutingControl {
    addTo(map: L.Map): this;
    on(event: string, handler: (e: unknown) => void): this;
}

const PinDirections: React.FC<PinDirectionsProps> = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (waypoints.length < 2) return;

        let routingControl: RoutingControl | null = null;

        const initRouting = async () => {
            await import('leaflet-routing-machine');

            routingControl = (L as any).Routing.control({
                waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
                lineOptions: {
                    addWaypoints: true,
                    extendToWaypoints: true,
                    missingRouteTolerance: 10,
                },
                show: false,
                collapsible: true,
                createMarker: () => null,
                fitSelectedRoutes: false,
            }) as RoutingControl;

            routingControl
                .addTo(map)
                .on("waypointschanged", (e: unknown) => {
                    console.log("waypoint changed", e);
                });
        };

        void initRouting();

        return () => {
            if (routingControl) {
                map.removeControl(routingControl as any); // Leaflet's removeControl isn't typed properly
            }
        };
    }, [map, waypoints]);

    return null;
};

export default PinDirections;
