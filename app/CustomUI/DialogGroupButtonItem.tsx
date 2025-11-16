"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ReactElement } from "react";

type ButtonGroupButtonItemsProps = {
    id: string;
    buttonName: string;
    title: string;
    dialogForm: ReactElement;
};

export const ButtonGroupButtonItem = ({ id, buttonName, title, dialogForm }: ButtonGroupButtonItemsProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonGroupItem
                    id={id}
                    className={
                    id === 'sign-in'
                        ?
                        'bg-amber-200 hover:bg-amber-500 selected:bg-amber-200 selected:hover:bg-amber-500 '
                        :
                        'bg-white hover:bg-amber-500 selected:hover:bg-amber-500'
                }>
                    {buttonName}
                </ButtonGroupItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                    {dialogForm}
            </DialogContent>
        </Dialog>
    );
};
