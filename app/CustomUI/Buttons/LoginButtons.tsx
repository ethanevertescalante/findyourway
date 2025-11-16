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

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        console.log("credentials: ",email, password);
        if (!password || !email) {
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
            setError(result.error.message || "Login failed. Please try again.");
        } else {
            console.log(result.data);
        }
    };

    return(
        <div className="grid gap-4">
            <form onSubmit={handleSignIn}>
                <div className="grid gap-3 pb-5">
                    <Input
                        isRequired
                        label="Email"
                        placeholder="email@findyourway.com"
                        type="email"
                        value={email}
                        onChange={setEmail}
                    />
                </div>
                <div className="grid gap-3 pb-5">
                    <Input
                        isRequired
                        label="Password"
                        name="password"
                        placeholder="abcd-1234"
                        type="password"
                        value={password}
                        onChange={setPassword}
                    />
                </div>
                <Button type="submit" className="w-full" color="primary" size="lg" iconLeading={AtSign}>Sign In With Email</Button>
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
    const [error, setError] = useState("");

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");


        console.log("credentials: ",email, password);
        if (!password || !email) {
            setError("Please enter credentials");
        } else {
            const result = await authClient.signUp.email({
                name: username,
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

    return (
        <div className="grid gap-4">
            <form onSubmit={handleSignUp}>
            <div className="grid gap-3 pb-5">
                <Input
                    isRequired
                    label="Username"
                    placeholder="MrFindYourWay"
                    type="text"
                    value={username}
                    onChange={setUsername}
                />
            </div>
            <div className="grid gap-3 pb-5">
                <Input
                    isRequired
                    label="Email"
                    placeholder="email@findyourway.com"
                    type="email"
                    value={email}
                    onChange={setEmail}
                />
            </div>
            <div className="grid gap-3 pb-5">
                <Input
                    isRequired
                    label="Password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div className="grid gap-3 pb-5">
                <Input
                    isRequired
                    label="Re-Type Password"
                    placeholder="re-type password"
                    type="password"
                    value={retype}
                    onChange={setRetype}
                />
            </div>
            <Button
                color="primary"
                className="w-full"
                size="lg"
                iconLeading={Globe05}
                type="submit"
            >
                Start Travelling!
            </Button>
                <p className="text-center text-red-400">{error}</p>
            </form>
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