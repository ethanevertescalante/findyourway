import type { Key } from 'react-aria'
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import {useState} from "react";
import MapIcon from "@/app/CustomUI/Icons/MapIcon";
import DiscoverIcon from "@/app/CustomUI/Icons/DiscoverIcon";
import SettingsIcon from "@/app/CustomUI/Icons/SettingsIcon";
import SearchIcon from "@/app/CustomUI/Icons/SearchIcon";
import {AdditionButton} from "@/app/CustomUI/Dropdowns/AdditionDropdown";
import Button from "./Buttons/Button"
import type { PinFormData } from "./PinMenu"
import SearchBar from "@/app/CustomUI/SearchBar";



type ButtonLayoutProps = {
    onAddPin: (data: PinFormData) => void;
};



//const ButtonLayout = ()  => {
export function ButtonLayout({ onAddPin }: ButtonLayoutProps) {

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


                <Button buttonName="FindYourWay" homeButton={true}/>
                <Button picture={MapIcon} id="map" buttonName="Map"/>
                <Button picture={DiscoverIcon} id="discover" buttonName="Discover"/>
                <Button picture={SettingsIcon} id="settings" buttonName="Settings"/>
            </ButtonGroup>
            <ButtonGroup size="lg" className="pl-3" selectedKeys={[]}>
                <AdditionButton onAddPin={onAddPin} />
            </ButtonGroup>
        </div>
    )
}

export default ButtonLayout;