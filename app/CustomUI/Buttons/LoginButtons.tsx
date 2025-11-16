import { ButtonGroup } from "@/components/base/button-group/button-group";
import { ButtonGroupButtonItem } from "@/app/CustomUI/DialogGroupButtonItem";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button"
import Divider from '@mui/material/Divider';
import {SocialButton} from "@/components/base/buttons/social-button";
import {AtSign} from "lucide-react";
import {Globe05} from "@untitledui/icons";
import {authClient} from "@/app/lib/auth-client";
import {FormEvent, useState} from "react";


const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter credentials");
        } else {
            const result = await authClient.signIn.email({
                email: email,
                password: password,
                callbackURL: "/",
            });

            if (result.error) {
                setError(result.error.message || "Login failed. Please try again.");
            } else {
                console.log(result);
            }
        }
    };


    const handleGoogleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        setError("");
        const result = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/profile",
        });

        if (result.error) {

        } else {
            console.log(result.data);
        }
    };

    return(
        <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-3 pb-5">
                    <p className="text-gray-500 size-4 text-nowrap">Email *</p>
                    <input
                        className="h-10 w-full border border-gray-300 rounded-md selected:border-gray-300"
                        placeholder="  email@findyourway.com"
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-3 pb-5">
                    <p className="text-gray-500 size-4 text-nowrap">Password *</p>
                    <input
                        className="h-10 w-full border border-gray-300 rounded-md "
                        name="password"
                        placeholder="  abcd-1234"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <Button className="w-full" color="primary" size="lg" iconLeading={AtSign}>Sign In With Email</Button>
            </form>
            <p className="text-center text-red-400">{error}</p>
            <Divider textAlign="center">OR</Divider>
            <form onSubmit={handleGoogleSubmit}>
                <SocialButton className="w-full" type={"submit"} social={"google"}>Sign In With Google</SocialButton>
            </form>
        </div>
    )
}



const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");

    return (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <Input isRequired label="Username" placeholder="Mr.FindYourWay"/>
            </div>
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

    )}



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