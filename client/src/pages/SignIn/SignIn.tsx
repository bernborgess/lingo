import './SignIn.css';

// components
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';

// assets
import Lingo from "../../assets/hello-lingo.svg"

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { User, emptyData } from "../../types/user";
import React from 'react';



export default function SignIn() {
    const [loginUser, setLoginUser] = React.useState<User>(emptyData);
    
    function updateData(addNewUser: Partial<User>) {
        setLoginUser({ ...loginUser, ...addNewUser });
    }

    async function handleSubmit() {
        console.log(loginUser.username);
    }

    return (
        <div className='SignIn'>
            <img src={Lingo} />
            <form>
                <h2><b>Login</b> to your account</h2>
                <TextInput 
                    type="text" 
                    value={loginUser.username}
                    onChange={ (e) => updateData({ username: e.target.value })} 
                    placeHolder='Username' icon={<PersonIcon htmlColor='var(--green)' />} 
                />
                <TextInput 
                    type="password" 
                    value={loginUser.password} 
                    onChange={(e) => updateData({ password: e.target.value })} 
                    placeHolder='Password' icon={<LockIcon htmlColor='var(--green)' />} 
                />
                <Button onClick={handleSubmit} label="Login" />
            </form>
        </div>
    )
}