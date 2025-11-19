import { FaceSmile, LogOut01, Settings01, User01} from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import GithubIcon from "@/app/CustomUI/Icons/GithubIcon";
import {authClient} from "@/app/lib/auth-client";
import Link from "next/link";

type AvatarDropdownProps = {
    session:{
        username: string;
        email: string;
        image: string;
        travellerSince: string;
    }
}

export const AvatarDropdown = ({session} : AvatarDropdownProps) => {

    const HandleLogout = async () => {
        await authClient.signOut();
        window.location.reload();
    };

   return (
    <Dropdown.Root >
        <div>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx("group relative inline-flex cursor-pointer rounded-full outline-focus-ring ", (isPressed || isFocusVisible) && "outline-2 outline-offset-2")
                }
            >
                <Avatar size="lg" src={session.image} alt="Avatar Image" />
            </AriaButton>
        </div>
        <Dropdown.Popover>
            <div className="flex gap-3 border-b border-secondary p-3">
                <AvatarLabelGroup
                    size="md"
                    src={session.image}
                    alt="Avatar Image"
                    title={session.username ?? "User"}
                    subtitle={session.email ?? "email@findyourway.com"}
                />
            </div>
            <Dropdown.Menu>
                <Dropdown.Section>
                    <Dropdown.Item icon={User01}>
                        View profile
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01}>
                        Settings
                    </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                    <Dropdown.Item icon={GithubIcon} href="https://github.com/ethanevertescalante/findyourway/tree/main" target="_blank">
                        <p className="pl-2">
                            Github
                        </p>
                    </Dropdown.Item>
                    <Dropdown.Item
                        icon={FaceSmile}
                    >
                        <span className="flex items-center justify-center text-wrap">
                             Created By Ethan Escalante and Kyle Garrity
                        </span>
                    </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Section>
                    <Dropdown.Item icon={LogOut01} onClick={HandleLogout}>
                            Log out
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);
}