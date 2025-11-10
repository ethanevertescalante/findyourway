import type { Key } from 'react-aria'
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import {useState} from "react";
import MapIcon from "@/app/CustomUI/Icons/MapIcon";
import DiscoverIcon from "@/app/CustomUI/Icons/DiscoverIcon";
import SettingsIcon from "@/app/CustomUI/Icons/SettingsIcon";
import SearchIcon from "@/app/CustomUI/Icons/SearchIcon";
import {AdditionButton} from "@/app/CustomUI/Dropdowns/AdditionDropdown";
import Button from "./Button"
import {AvatarDropdown} from "@/app/CustomUI/Dropdowns/AvatarDropdown";

const ButtonLayout = ()  => {

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["map"]));

    return (
            <div className="flex flex-row justify-between">
                <ButtonGroup size="lg" className="pr-3" selectedKeys={[]}>
                    <ButtonGroupItem className=" hover:bg-amber-200" iconTrailing={SearchIcon} id='search'> </ButtonGroupItem>
                </ButtonGroup>
            <ButtonGroup size="lg" selectedKeys={selectedKeys} selectionMode={"single"}  onSelectionChange={setSelectedKeys}>
                <Button buttonName="FindYourWay" homeButton={true}/>
                <Button picture={MapIcon} id="map" buttonName={"Map"}/>
                <Button picture={DiscoverIcon} id="discover" buttonName={"Discover"}/>
                {/*<Button picture={SettingsIcon} id="settings" buttonName={"Settings"}/>*/}

            </ButtonGroup>
                <ButtonGroup size="lg" className="pl-3" selectedKeys={[]}>
                   <AdditionButton/>
                </ButtonGroup>
            </div>
    )
}

export default ButtonLayout;