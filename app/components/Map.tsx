'use client'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon, Map as LeafletMap, LatLng } from 'leaflet';
import {useRef, useState, useMemo, useEffect, useCallback} from "react";
import SearchBar from './SearchBar';


/*
TODO:: the scrolling feels so janky because of two things happening at the same time
When you scroll is it both scrolling and tapping which causes it to "double scroll"
for now, I will disable trackpad scroll until we figure out a fix

update, it might be something else, not work looking at right now
For Now, I have disabled any zoom with trackpad, only zoom with buttons is allowed
 */



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

    const PinEditWindow = () => {

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
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            <MapContainer
                ref={mapRef}
                center={[51.505, -0.09]}
                zoom={10}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[51.505, -0.09]}
                    icon={leafletIcon}
                >
                    <Popup closeOnEscapeKey={true}>
                        A pretty CSS3 popup. <br/> Easily customizable.
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






        </div>
    )
}
/*





{pins.map((i) => (
                    <Marker key={pin.id} position={pin.position} icon={leafletIcon}>
                        <Popup>
                            <strong>{pin.location}</strong><br />
                            {pin.review}<br />
                            {pin.cost}<br />
                        </Popup>
                    </Marker>
                ))}
 */

export default Map;