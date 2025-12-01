'use client'
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

type LatLngTuple = [number, number];

type PinDirectionsProps = {
    waypoints: LatLngTuple[];
};

const PinDirections: React.FC<PinDirectionsProps> = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (waypoints.length < 2) return;

        let routingControl: any;

        const initRouting = async () => {
            // important: dynamically import so it runs on the client
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
            }).addTo(map)
                .on('waypointschanged', function (e) {
                    console.log('waypoint changed');
                })
        };

        void initRouting();

        return () => {
            if (routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, waypoints]);

    return null;
};

export default PinDirections;
