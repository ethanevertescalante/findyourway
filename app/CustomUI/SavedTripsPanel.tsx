'use client';

import React from "react";
import type { Trip } from "./Map";
import Button from "@/app/CustomUI/Buttons/Button";
import displayTrip from "@/app/CustomUI/DisplayTrip";

type SavedTripsPanelProps = {
    open: boolean;
    trips: Trip[];
    onClose: () => void;
    onLoadTrip: (tripId: string) => void;
    onDeleteTrip: (tripId: string) => void;
};

const SavedTripsPanel: React.FC<SavedTripsPanelProps> = ({
                                                             open,
                                                             trips,
                                                             onClose,
                                                             onLoadTrip,
                                                             onDeleteTrip,
                                                         }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl px-4 py-3 min-w-[280px] max-w-sm max-h-[60vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-semibold">Saved Trips</h2>
                    <button
                        className="text-xs text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {trips.length === 0 && (
                    <div className="text-xs text-gray-500 mb-2">
                        No saved trips yet. Build a trip and click “Save Trip”.
                    </div>
                )}

                <ul className="space-y-2">
                    {trips.map(trip => (
                        <li
                            key={trip.id}
                            className="border border-gray-200 rounded-md px-2 py-1 text-xs flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">{trip.name}</div>
                                <div className="text-gray-500">
                                    {trip.pins.length} pin{trip.pins.length === 1 ? "" : "s"}
                                </div>
                            </div>

                            <div className="flex gap-1">
                                <button
                                    className="text-xs text-gray-500 hover:text-gray-800"
                                    onClick={() => onDeleteTrip(trip.id)}
                                >
                                    Delete Trip
                                </button>
                                |
                                <button
                                    className="text-xs text-gray-500 hover:text-gray-800"
                                    onClick={() => onLoadTrip(trip.id)}
                                >
                                    Load Trip
                                </button>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SavedTripsPanel;
