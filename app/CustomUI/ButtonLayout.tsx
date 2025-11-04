import type { Key } from 'react-aria'
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import {useState} from "react";


const ButtonLayout = ()  => {

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["map"]));

    return (
        <ButtonGroup size="lg" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <ButtonGroupItem id='map'>Map</ButtonGroupItem>
            <ButtonGroupItem id='discover'>Discover</ButtonGroupItem>
            <ButtonGroupItem id='settings'>Settings</ButtonGroupItem>
        </ButtonGroup>
    )
}

export default ButtonLayout;