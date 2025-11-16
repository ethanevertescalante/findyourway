'use client';
import { useCallback } from 'react';
import {TextField, Label, TextArea, Input, FieldError} from 'react-aria-components';

export type PinFormData = {
    location: string;
    review: string;
    cost: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onAddPin: (data: PinFormData) => void;
};

export function PinDetailsMenu({ open, onClose, onAddPin }: Props) {
    if (!open) return null;

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const fd = new FormData(form);

        const data: PinFormData = {
            location: String(fd.get('location') || ''),
            review:   String(fd.get('review') || ''),
            cost:     String(fd.get('cost') || ''),
        };

        onAddPin(data);
        onClose();
    }, [onAddPin, onClose]);



    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-start left-[46px] bottom-[270px]">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-80">

                {/* Title */}
                <Label className="block w-full text-center text-lg font-medium text-gray-900">Pin Details</Label>

                <form onSubmit={handleSubmit}>

                    {/* Location */}
                    <TextField isRequired className="flex flex-col gap-1 text-gray-900 mt-4">
                        <Label className="text-sm font-medium">Location</Label>
                        <TextArea
                            name="location"
                            placeholder="Enter your location"
                            className="
                            rounded-md border border-gray-300 bg-white p-3 outline-none
                            w-full min-h-[90px]
                            text-gray-900
                            placeholder:text-gray-350
                            placeholder:text-sm
                            [data-focused]:ring-2 [data-focused]:ring-blue-500
                            [data-invalid]:border-red-500"/>
                        <FieldError className="mt-1 text-xs text-red-600" />

                    </TextField>



                    {/* Review */}
                    <TextField isRequired className="flex flex-col gap-1 text-gray-900 mt-4">
                        <Label className="text-sm font-medium">Review</Label>
                        <TextArea
                            name="review"
                            placeholder="Enter your review"
                            className="
                            rounded-md border border-gray-300 bg-white p-3 outline-none
                            w-full min-h-[90px]
                            text-gray-900
                            placeholder:text-gray-350
                            placeholder:text-sm
                            [data-focused]:ring-2 [data-focused]:ring-blue-500
                            [data-invalid]:border-red-500"/>
                        <FieldError className="mt-1 text-xs text-red-600" />

                    </TextField>



                {/* Cost */}
                <TextField isRequired validationBehavior="native" className="flex flex-col gap-1 text-gray-900 mt-4">
                    <Label className="text-sm font-medium">Estimated Cost</Label>
                    <Input
                        name="cost"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Enter your cost (only a number)"
                        className="
                            rounded-md border border-gray-300 bg-white p-3 outline-none
                            w-full
                            text-gray-900
                            placeholder:text-gray-350
                            placeholder:text-sm
                            [data-focused]:ring-2 [data-focused]:ring-blue-500
                            [data-invalid]:border-red-500"/>
                    <FieldError className="mt-1 text-xs text-red-600" />

                </TextField>

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button"
                            onClick={onClose}
                            className="px-3 py-2 rounded-md border border-red-500 text-black disabled:opacity-50 hover:bg-gray-300">
                            Cancel
                    </button>
                    <button type="submit"
                            className="px-3 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700">
                            Save
                    </button>
                </div>
            </form>
        </div>
</div>
);
}
