'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, Map as LeafletMap, LatLng } from 'leaflet';
import ButtonLayout from "@/app/CustomUI/ButtonLayout";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {useRef, useState, useMemo, useEffect, useCallback} from "react";
import SearchBar from './SearchBar';

const Map = () => {

    type Pin = {
        id: string;
        position: [number, number];
        location: string;
        review: string;
        cost: number; // e.g., USD
    };

    const [pins, setPins] = useState<Pin[]>([]);

    const mapRef = useRef<LeafletMap | null>(null);
    const [draggable, setDraggable] = useState(false)
    const [pinEditWindowOpen, setPinEditWindowOpen] = useState(false)

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

    const PinEditWindow = (props) => {

        return (

            <div className="pinEditBox">
                <button onClick={() => setPinEditWindowOpen(false)} className="pinEditExitButton">x</button>

                <div className="pinEditBox-title">
                    Pin Details
                </div>
                <div className="pinEditBox-inner">
                    <label htmlFor="username" className="locationBoxHeader">Location:</label>
                    <textarea className="locationBox"
                              id="username"
                              name="username"
                              placeholder="Enter your location here"></textarea>


                    <label htmlFor="message" className="reviewBoxHeader">Review:</label>
                    <textarea className="reviewBox"
                              id="message"
                              name="message"
                              placeholder="Enter your review here"></textarea>


                    <label htmlFor="message" className="reviewBoxHeader">Cost:</label>
                    <textarea className="reviewBox"
                              id="message"
                              name="message"
                              placeholder="Enter your estimated cost here"></textarea>


                    <button onClick={() => setPinEditWindowOpen(false)} className="pinEditSaveButton">Save</button>

                </div>
            </div>
        );
    }


    const makeNewPin = () => {
        const map = mapRef.current;
        if (!map) return;

        //add a pin at the current map center
        const c = map.getCenter();

        setPins((prev) => [...prev, [c.lat, c.lng]]);
    };

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])




    return (

        <div className="relative w-screen h-screen m-0 p-0">
            <MapContainer
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


                {/* Make new pins from button */}
                {pins.map((pos, i) => (
                    <Marker key={i}
                            position={pos}
                            icon={leafletIcon}
                            draggable={draggable}>
                        {/*<Popup>Pin #{i + 1}</Popup>     */}
                        <Popup minWidth={30}>
                            <span onClick={toggleDraggable}>
                                {draggable
                                    ? 'Lock Pin'
                                    : 'Unlock Pin'}
                            </span>
                        </Popup>
                    </Marker>
                ))}


                <SearchBar />


            </MapContainer>

            <button onClick={makeNewPin} className="mapButton">Add Pin</button>
            <button onClick={() => setPinEditWindowOpen(true)} className="pinEditButton">Edit Pin</button>
            {pinEditWindowOpen && <PinEditWindow />}

            {/* absolutely position the buttons at the bottom */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <ButtonLayout />
            </div>
        </div>
    );
};

//if you want the header on top, remove absolute in the div above
export default Map;
