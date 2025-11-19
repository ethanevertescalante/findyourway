import { MarkerPin01 } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import AdditionIcon from "@/app/CustomUI/Icons/AdditionIcon";
import {PinDetailsMenu, PinFormData} from "@/app/CustomUI/Pins/PinMenu";
import React, { useState } from 'react';




type DropdownItemProps = {
    picture: React.FunctionComponent<{ className?: string }>;
    text: string;
    onClick?: () => void;
};

type AdditionButtonProps = {
    onAddPin: (data: PinFormData) => void;
};

const DropdownItem = ({ picture, text, onClick }: DropdownItemProps) => {
    return (
        <Dropdown.Item
            icon={picture}
            onClick={onClick}                  // ← forward it
            className="text-center cursor-pointer"
        >
            {text}
        </Dropdown.Item>
    );
};


export const AdditionButton = ({ onAddPin }: AdditionButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleAddPinFromMenu = (data: PinFormData) => {
        onAddPin(data);          // send data up to Map
    };


    return(
        <>
            <Dropdown.Root>
                <ButtonGroup>
                    <ButtonGroupItem className="hover:bg-amber-200"  iconTrailing={AdditionIcon} id='add'> </ButtonGroupItem>
                </ButtonGroup>

                <Dropdown.Popover placement="top">
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <DropdownItem
                                picture={MarkerPin01}
                                text={"Add New Pin"}
                                onClick={() => setOpen(true)}
                            />
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
            <PinDetailsMenu
                onAddPinAction={handleAddPinFromMenu}
                open={open}
                onCloseAction={() => setOpen(false)}
            />
        </>
    );
}
