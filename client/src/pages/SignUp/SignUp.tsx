import './Sigup.css';

// components
import { Button } from "../../components/Button";

// assets
import Lingo from "../../assets/hello-lingo.svg"


export default function SignUp() {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

    }

    return (
        <div className='SignUp'>
            <img src={Lingo} />
            <form>
                <h1><b>Sign Up</b> to your account</h1>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <Button onClick={(e) => handleSubmit(e)} label="Sign Up" />
            </form>
        </div>
    )
}