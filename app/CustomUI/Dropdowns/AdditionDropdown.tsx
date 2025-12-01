'use client';

import { MarkerPin01 } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import AdditionIcon from "@/app/CustomUI/Icons/AdditionIcon";
import { PinDetailsMenu, PinFormData } from "@/app/CustomUI/Pins/PinMenu";
import React, { useState } from "react";

type DropdownItemProps = {
    picture: React.FunctionComponent<{ className?: string }>;
    text: string;
    onClick?: () => void;
};

type AdditionButtonProps = {
    onAddPin: (data: PinFormData) => void;
    onOpenTripBuilder: () => void;
    onOpenSavedTrips: () => void;
};

const DropdownItem = ({ picture, text, onClick }: DropdownItemProps) => (
    <Dropdown.Item
        icon={picture}
        onClick={onClick}
        className="text-center cursor-pointer"
    >
        {text}
    </Dropdown.Item>
);

export const AdditionButton = ({
                                   onAddPin,
                                   onOpenTripBuilder,
                                   onOpenSavedTrips,
                               }: AdditionButtonProps) => {
    const [openAddPinMenu, setOpenAddPinMenu] = useState(false);

    const handleAddPinFromMenu = (data: PinFormData) => {
        onAddPin(data);
    };

    return (
        <>
            <Dropdown.Root>
                <ButtonGroup>
                    <ButtonGroupItem
                        className="hover:bg-amber-200"
                        iconTrailing={AdditionIcon}
                        id="add"
                    />
                </ButtonGroup>

                <Dropdown.Popover placement="top">
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <DropdownItem
                                picture={MarkerPin01}
                                text="Add New Pin"
                                onClick={() => setOpenAddPinMenu(true)}
                            />
                            <DropdownItem
                                picture={MarkerPin01}
                                text="New Trip"
                                onClick={onOpenTripBuilder}
                            />
                            <DropdownItem
                                picture={MarkerPin01}
                                text="Saved Trips"
                                onClick={onOpenSavedTrips}
                            />
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>

            <PinDetailsMenu
                onAddPinAction={handleAddPinFromMenu}
                open={openAddPinMenu}
                onCloseAction={() => setOpenAddPinMenu(false)}
            />
        </>
    );
};
