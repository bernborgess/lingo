import './SignIn.css';

// components
import { Button } from "../../utils/components/Button";
import { TextInput } from '../../utils/components/TextInput';

// assets
import Lingo from "../../assets/hello-lingo.svg"

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';


import { User, emptyData } from "../../utils/types/user";


import React from 'react';
import { useNavigate } from 'react-router-dom';


import {Divider, Link} from '@mui/material';
import { useUserData } from '../../utils/context/AuthContext';



export default function SignIn() {
    const [loginUser, setLoginUser] = React.useState<User>(emptyData);
    const { signIn } = useUserData();
    const navigate = useNavigate();
    
    function updateData(addNewUser: Partial<User>) {
        setLoginUser({ ...loginUser, ...addNewUser });
    }

    async function handleSubmit() {
        signIn(loginUser)
        navigate("app")
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
            <Divider/>
            <div>
                Don't have an account?    
                <Link href="./SignUp" color="inherit">
                    Sign Up
                </Link>
            </div>
        </div>
    )
}