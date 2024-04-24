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

// hooks
import { NewUser, emptyData } from "../../types/user";

import React from 'react';


export default function SignUp() {
    const [newUser, setNewUser] = React.useState<NewUser>(emptyData);
    
    function updateData(addNewUser: Partial<NewUser>) {
        setNewUser({ ...newUser, ...addNewUser });
    }

    async function handleSubmit() {
        console.log({newUser});
    }

    return (
        <div className='SignUp'>
            <img src={Lingo} />
            <form>
                <h2><b>Sign Up</b> to your account</h2>
                <TextInput 
                    type="text" value={newUser.username} 
                    onChange={ (e) => updateData({ username: e.target.value })} 
                    placeHolder='Username' icon={<PersonIcon htmlColor='var(--green)' />} 
                />
                <TextInput 
                    type="text" value={newUser.email} 
                    onChange={(e) => updateData({ email: e.target.value })} 
                    placeHolder='Email' icon={<MailIcon htmlColor='var(--green)' />} 
                />
                <TextInput 
                    type="password" value={newUser.password} 
                    onChange={(e) => updateData({ password: e.target.value })} 
                    placeHolder='Password' icon={<LockIcon htmlColor='var(--green)' />} 
                />
                <Button onClick={handleSubmit} label="Sign Up" />
            </form>
        </div>
    )
}