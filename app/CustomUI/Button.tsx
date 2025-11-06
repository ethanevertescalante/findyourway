import { ButtonGroupItem } from "@/components/base/button-group/button-group";
import React from "react";
import dogImage from "../../public/dog.png"
import Image from "next/image";
type ButtonProps = {
    picture?: React.ReactNode; // JSX.Element also ok
    id: string;
    buttonName: string;
    homeButton?: boolean; // consider renaming to isSelected?: boolean
};

const Button = ({ picture, id, buttonName, homeButton }: ButtonProps) => {
    const audio = React.useMemo(() => new Audio("/dogBarking.mp3"), []);
    const play = () => { audio.play().then(r => r) };

    return (
            <ButtonGroupItem
                className="relative overflow-visible hover:bg-amber-200 selected:bg-amber-500 selected:font-bold group  "
                iconTrailing={picture}
                id={id}
                {...(homeButton ? { onClickCapture: play } : {})}
            >
                {buttonName}

                {homeButton && (
                    <div
                        className="
                        absolute left-1/2
                        -translate-x-1/2
                        bottom-6
                        opacity-0
                        translate-y-0
                        transition-all
                        duration-500
                        ease-out
                        group-hover:opacity-100
                        group-hover:-translate-y-2
                        pointer-events-none
                        "
                    >
                        <Image
                            src={dogImage}
                            alt="Dog"
                            width={50}
                            height={50}
                            className="drop-shadow-lg"
                        />
                    </div>
                )}

            </ButtonGroupItem>

    );
};

export default Button;
