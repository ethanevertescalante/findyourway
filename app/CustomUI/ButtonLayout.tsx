import type { Key } from 'react-aria';
import { ButtonGroup } from "@/components/base/button-group/button-group";
import { useState } from "react";
import { AdditionButton } from "@/app/CustomUI/Dropdowns/AdditionDropdown";
import type { PinFormData } from "./Pins/PinMenu";
import Button from "./Buttons/Button";

type ButtonLayoutProps = {
    onAddPin: (data: PinFormData) => void;
    onOpenTripBuilder: () => void;
    onOpenSavedTrips: () => void;
};

export function ButtonLayout({
                                 onAddPin,
                                 onOpenTripBuilder,
                                 onOpenSavedTrips,
                             }: ButtonLayoutProps) {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["map"]));

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="pr-3 w-3" aria-hidden />

            <ButtonGroup
                size="lg"
                selectedKeys={selectedKeys}
                selectionMode="single"
                onSelectionChange={setSelectedKeys}
            >
                <Button buttonName="FindYourWay" homeButton={true} />
            </ButtonGroup>

            <ButtonGroup size="lg" className="pl-3" selectedKeys={[]}>
                <AdditionButton
                    onAddPin={onAddPin}
                    onOpenTripBuilder={onOpenTripBuilder}
                    onOpenSavedTrips={onOpenSavedTrips}
                />
            </ButtonGroup>
        </div>
    );
}

export default ButtonLayout;
