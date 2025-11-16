import type { Dispatch, SetStateAction } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Pin } from "./Map";
import type { PinFormData } from "./PinMenu"


export function addPinAtCenter(
    map: LeafletMap | null,
    setPins: Dispatch<SetStateAction<Pin[]>>,
    formData: PinFormData
) {
    if (!map) return;

    const c = map.getCenter();
    //const costNumber = Number(formData.cost) || 0;


    setPins(prev => [
        ...prev,
        {
            id: crypto.randomUUID(),
            position: [c.lat, c.lng],
            location: formData.location,
            review: formData.review,
            cost: formData.cost,
            draggable: false,
        },
    ]);
}
