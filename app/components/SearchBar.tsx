'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';  // npm i leaflet-control-geocoder

export default function SearchBar() {
    const map = useMap();

    useEffect(() => {
        const ctl = new (L.Control as any).Geocoder().addTo(map);
        return () => map.removeControl(ctl);
    }, [map]);

    return null;
}
