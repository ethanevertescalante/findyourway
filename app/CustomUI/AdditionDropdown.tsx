import { MarkerPin01 } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import AdditionIcon from "@/app/CustomUI/Icons/AdditionIcon";
import React from "react";


type DropdownItemProps = {
    picture: React.FunctionComponent<{ className?: string }>;
    text: string;
};

const DropdownItem = (props: DropdownItemProps) => {
    const picture = props.picture;
    const text = props.text;

    return (
        <Dropdown.Item className="text-center" icon={picture}>
            {text}
        </Dropdown.Item>
    )
}

export const AdditionButton = () => {



    return(
            <Dropdown.Root>
                <ButtonGroup>
                    <ButtonGroupItem className="hover:bg-amber-200"  iconTrailing={AdditionIcon} id='add'> </ButtonGroupItem>
                </ButtonGroup>
                <Dropdown.Popover placement="top">
                    <Dropdown.Menu>
                        <Dropdown.Item isDisabled={true} className="flex justify-center gap-3 border-b cursor-default border-secondary">
                            Actions
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <DropdownItem picture={MarkerPin01} text={"Add New Marker"}/>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>

    );
}