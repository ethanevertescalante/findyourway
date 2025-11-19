import { ButtonGroup } from "@/components/base/button-group/button-group";
import { ButtonGroupButtonItem } from "@/app/CustomUI/DialogGroupButtonItem";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button"
import Divider from '@mui/material/Divider';
import {SocialButton} from "@/components/base/buttons/social-button";
import {AtSign} from "lucide-react";
import {Globe05} from "@untitledui/icons";


const SignInForm = () => (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <Input isRequired label="Email" placeholder="email@findyourway.com"/>
            </div>
            <div className="grid gap-3">
                <Input isRequired label="Password" placeholder="abcd-1234"/>
            </div>
            <Button color="primary" size="lg" iconLeading={AtSign}>Sign In With Email</Button>
            <Divider textAlign="center">OR</Divider>
            <SocialButton social={"google"}>Sign In With Google</SocialButton>
        </div>

)

const RegisterForm = () => (
    <div className="grid gap-4">
        <div className="grid gap-3">
            <Input isRequired label="Email" placeholder="email@findyourway.com"/>
        </div>
        <div className="grid gap-3">
            <Input isRequired label="Password" placeholder="password"/>
        </div>
        <div className="grid gap-3">
            <Input isRequired label="Re-Type Password" placeholder="re-type password"/>
        </div>
        <Button color="primary" size="lg" iconLeading={Globe05}>Start Travelling!</Button>
    </div>

)



export const LoginButtons = () => {
    return (
        <ButtonGroup size='lg' className="mt-4 mr-4">
            <ButtonGroupButtonItem
                id="register"
                buttonName="Register"
                title="Register To FindYourWay!"
                dialogForm={<RegisterForm />}
            />
            <ButtonGroupButtonItem
                id="sign-in"
                buttonName="Sign In"
                title="Welcome Back To FindYourWay!"
                dialogForm={<SignInForm />}
            />
        </ButtonGroup>
    )
}