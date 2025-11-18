'use client';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';  // npm i leaflet-control-geocoder

export default function SearchBar() {
    const map = useMap();
    const hostRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!map || !hostRef.current) return;

        const ctl = (L.Control as any).geocoder({
            position: 'bottomleft',
            collapsed: true,
            placeholder: 'Search…',
        }).addTo(map);

        const container =
            (ctl as any).getContainer?.() ?? (ctl as any)._container;

        if (container) {
            container.classList.add('myGeocoder');
            hostRef.current.appendChild(container);
        }

        return () => {
            if (container && hostRef.current?.contains(container)) {
                hostRef.current.removeChild(container);
            }
            map.removeControl(ctl);
        };
    }, [map]);

    return <div ref={hostRef} />;
}
