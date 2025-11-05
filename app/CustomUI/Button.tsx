import { ButtonGroupItem } from "@/components/base/button-group/button-group";
import React from "react";

type ButtonProps = {
    picture?: React.ReactNode; // JSX.Element also ok
    id: string;
    buttonName: string;
    homeButton?: boolean; // consider renaming to isSelected?: boolean
};

const Button = ({ picture, id, buttonName, homeButton }: ButtonProps) => {
    return (
        <ButtonGroupItem
            className={
            !homeButton ?
                "hover:bg-amber-200 selected:bg-amber-500 selected:font-bold"
                :
                ""
        }
            iconTrailing={picture}
            id={id}
        >
            {buttonName}
        </ButtonGroupItem>
    );
};

export default Button;
