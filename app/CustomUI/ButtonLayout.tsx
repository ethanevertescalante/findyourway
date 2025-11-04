import type { Key } from 'react-aria'
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import {useState} from "react";
import MapIcon from "@/app/CustomUI/MapIcon";
import DiscoverIcon from "@/app/CustomUI/DiscoverIcon";
import SettingsIcon from "@/app/CustomUI/SettingsIcon";

const ButtonLayout = ()  => {

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["map"]));


    return (
        <ButtonGroup size="lg" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <ButtonGroupItem  id="findyourway" className='font-bold underline italic'>FindYourWay</ButtonGroupItem>
            <ButtonGroupItem iconTrailing={MapIcon} id='map'>Map</ButtonGroupItem>
            <ButtonGroupItem iconTrailing={DiscoverIcon} id='discover'>Discover</ButtonGroupItem>
            <ButtonGroupItem iconTrailing={SettingsIcon} id='settings'>Settings</ButtonGroupItem>
        </ButtonGroup>
    )
}

export default ButtonLayout;