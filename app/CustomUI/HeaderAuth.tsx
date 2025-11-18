'use client'

import { LoginButtons } from "@/app/CustomUI/Buttons/LoginButtons";
import { AvatarDropdown } from "@/app/CustomUI/Dropdowns/AvatarDropdown";
import useSWR from "swr";
import {LoadingIcon} from "next/dist/next-devtools/dev-overlay/icons/loading-icon";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeaderAuth() {

    const { data: session } = useSWR("/api/getsession", fetcher, {});
    console.log("user: ", session);

    if(session === undefined){
        return(<p className="size-5 text-black">loading</p>)
    }else {
        return (
    <>
        {!session.error ?
            (
                <div className="flex justify-end pt-4 pr-4">
                    <AvatarDropdown session={session}/>
                </div>
            ): (

            <div className="flex justify-end pt-4 pr-4">
                <LoginButtons />
            </div>

            )}
    </>
        )}}
