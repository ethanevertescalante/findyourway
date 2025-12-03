
import type { Pin } from "./Map";
import React from "react";

type Props = {
    open: boolean;
    name: string | null;
    pins: Pin[];
    onClearTrip: () => void;
    onSaveTrip: () => void;
    onClose: () => void;

};

export function DisplayTrip({ open, onClose, name, pins, onClearTrip, onSaveTrip }: Props) {
    // Only show if there's a named trip
    if (!name || !open) {
        return null;
    }

    const handleSave = () => {
        onSaveTrip();
        onClose();
    }



    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[700]">
            <div className="flex flex-row items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl shadow-2xl">
                {/* Trip name + buttons */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs whitespace-nowrap">
          <span className="font-extrabold text-gray-800 text-sm">
            Trip: {name}
          </span>

                    <button
                        onClick={onClearTrip}
                        className="bg-purple-500 hover:bg-purple-400 rounded-lg px-3 py-2 font-extrabold text-sm text-white"
                        style={{ boxShadow: "0 5px 35px 2px rgba(0, 0, 0, 0.35)" }}
                    >
                        Clear Trip
                    </button>

                    <button
                        onClick={handleSave}
                        className="bg-purple-500 hover:bg-purple-400 rounded-lg px-3 py-2 font-extrabold text-sm text-white"
                        style={{ boxShadow: "0 5px 35px 2px rgba(0, 0, 0, 0.35)" }}
                    >
                        Save Trip
                    </button>
                </div>

                <div className="max-w-[60vw] overflow-x-auto whitespace-nowrap flex items-center gap-2 px-1">
                {/* Directional bubbles */}
                {pins.map((pin, index) => (
                    <React.Fragment key={pin.id}>
                        {/* Arrow between bubbles */}
                        {index > 0 && (
                            <span className="text-gray-500 text-sm mx-1 select-none">
                →
              </span>
                        )}

                        {/* Pin bubble */}
                        <div
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white shadow-xl text-xs text-gray-800 whitespace-nowrap"
                            style={{ boxShadow: "0 5px 35px 2px rgba(0, 0, 0, 0.35)" }}
                        >
                            {/* Step number */}
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-500 text-[0.6rem] text-white">
                {index + 1}
              </span>
                            {/* Location text */}
                            <span>{pin.location}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
        </div>
    );
}

export default DisplayTrip;
