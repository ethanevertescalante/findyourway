import type { Dispatch, SetStateAction } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Pin } from "../Map";
import type { PinFormData } from "./PinMenu"
import getPinLocation from "@/app/CustomUI/Pins/getPinLocation";


export async function addPinAtCenter(
    map: LeafletMap | null,
    setPins: Dispatch<SetStateAction<Pin[]>>,
    formData: PinFormData
) {


    if (!map) return;
    const c = map.getCenter();
    const location = await getPinLocation(c.lat, c.lng);
    const newPin = {
        lat: c.lat,
        lng: c.lng,
        location: location,
        review: formData.review,
        cost: formData.cost,
    }
    //const costNumber = Number(formData.cost) || 0;
    const createPin = async () => {
        const res = await fetch(
            "/api/pins",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPin),
            }
        );
        const data = await res.json();
        console.log("Created pin:", data);
        // setPins(data.pins);
    };
    await createPin();
}
