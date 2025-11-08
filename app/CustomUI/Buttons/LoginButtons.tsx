import {ButtonGroup, ButtonGroupItem} from "@/components/base/button-group/button-group";
import {ButtonGroupButtonItem} from "@/app/CustomUI/DialogGroupButtonItem";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button"


const LoginForm = () => (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <Input isRequired label="Login" placeholder="email@findyourway.com"/>
            </div>
            <div className="grid gap-3">
                <Input isRequired label="Password" placeholder="abcd-1234"/>
            </div>
            <Button color="primary" size="lg">Login In</Button>
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
        <Button color="primary" size="lg">Register</Button>
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
                id="login"
                buttonName="Login"
                title="Login To FindYourWay!"
                dialogForm={<LoginForm />}
            />
        </ButtonGroup>
    )
}