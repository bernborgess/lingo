import './Sigup.css';

// components
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';

// assets
import Lingo from "../../assets/hello-lingo.svg"

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { useSignUpForm } from './hooks/useSignupForm';

export default function SignUp() {
    const { signupForm, setUserName, setUserEmail, setUserPassword } = useSignUpForm();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({signupForm});
    }

    return (
        <div className='SignUp'>
            <img src={Lingo} />
            <form>
                <h2><b>Sign Up</b> to your account</h2>
                <TextInput value={signupForm.userName} onChange={ setUserName} placeHolder='Username' icon={<PersonIcon htmlColor='var(--green)' />} />
                <TextInput value={signupForm.email} onChange={setUserEmail} placeHolder='Email' icon={<MailIcon htmlColor='var(--green)' />} />
                <TextInput value={signupForm.password} onChange={setUserPassword} placeHolder='Password' icon={<LockIcon htmlColor='var(--green)' />} />
                <Button onClick={(e) => handleSubmit(e)} label="Sign Up" />
            </form>
        </div>
    )
}