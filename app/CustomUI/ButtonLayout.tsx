import type { Key } from 'react-aria'
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import {useState} from "react";
import MapIcon from "@/app/CustomUI/MapIcon";
import DiscoverIcon from "@/app/CustomUI/DiscoverIcon";
import SettingsIcon from "@/app/CustomUI/SettingsIcon";
import SearchIcon from "@/app/CustomUI/SearchIcon";
import AdditionIcon from "@/app/CustomUI/AdditionIcon";

const ButtonLayout = ()  => {

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["map"]));
    //idk should I add another useState?


    return (
        <div className="flex flex-row justify-between">
            <ButtonGroup size="lg" className="pr-3" selectedKeys={[]}>
                <ButtonGroupItem className=" hover:bg-amber-200" iconTrailing={SearchIcon} id='search'> </ButtonGroupItem>
            </ButtonGroup>
        <ButtonGroup size="lg" selectedKeys={selectedKeys} selectionMode={"single"}  onSelectionChange={setSelectedKeys}>
            {/*<ButtonGroupItem  id="findyourway" className='font-bold underline italic'>FindYourWay</ButtonGroupItem>*/}
            <ButtonGroupItem className=" hover:bg-amber-200 selected:bg-amber-500 selected:font-bold" iconTrailing={MapIcon} id='map'>Map</ButtonGroupItem>
            <ButtonGroupItem className=" hover:bg-amber-200 selected:bg-amber-500 selected:font-bold" iconTrailing={DiscoverIcon} id='discover'>Discover</ButtonGroupItem>
            <ButtonGroupItem className=" hover:bg-amber-200 selected:bg-amber-500 selected:font-bold" iconTrailing={SettingsIcon} id='settings'>Settings</ButtonGroupItem>
        </ButtonGroup>
            <ButtonGroup size="lg" className="pl-3" selectedKeys={[]}>
                <ButtonGroupItem className=" hover:bg-amber-200" iconTrailing={AdditionIcon} id='add'> </ButtonGroupItem>
            </ButtonGroup>
        </div>
    )
}

export default ButtonLayout;