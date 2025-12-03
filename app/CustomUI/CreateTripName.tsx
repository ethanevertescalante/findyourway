"use client";

import React, { useState } from "react";

type CreateTripNameProps = {
    open: boolean;
    onClose: () => void;
    onSaveName: (name: string) => void;
    onSave2: () => void;
};

const CreateTripName: React.FC<CreateTripNameProps> = ({
                                                         open,
                                                         onClose,
                                                         onSaveName,
                                                         onSave2,
                                                     }) => {
    const [name, setName] = useState("");

    if (!open) return null;

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const safeName = name.trim() || `Trip ${Date.now()}`;



        onSaveName(safeName);
        onSave2();
        setName("");
    };

    return (
        <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl px-4 py-3 min-w-[260px] max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-semibold">Name Your Trip</h2>
                        <button
                            type="button"
                            className="text-xs text-gray-500 hover:text-gray-800"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>

                    <input
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs mb-3"
                        placeholder="Trip name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="rounded-lg px-3 py-1 bg-gray-200 text-xs hover:bg-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg px-3 py-1 bg-blue-600 text-white text-xs hover:bg-blue-700"
                        >
                            Save name
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTripName;
