import './SignIn.css';

// components
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';

// assets
import Lingo from "../../assets/hello-lingo.svg"

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useSignInForm } from './hooks/useSignInForm';

export default function SignIn() {
    const { signInForm, setUserName, setUserPassword } = useSignInForm();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({signInForm});
    }

    return (
        <div className='SignIn'>
            <img src={Lingo} />
            <form>
                <h2><b>Login</b> to your account</h2>
                <TextInput value={signInForm.userName} onChange={ setUserName} placeHolder='Username' icon={<PersonIcon htmlColor='var(--green)' />} />
                <TextInput value={signInForm.password} onChange={setUserPassword} placeHolder='Password' icon={<LockIcon htmlColor='var(--green)' />} />
                <Button onClick={(e) => handleSubmit(e)} label="Login" />
            </form>
        </div>
    )
}