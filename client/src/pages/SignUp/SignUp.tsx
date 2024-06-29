import './Sigup.css';

// components
import { Button } from "../../utils/components/Button";
import { TextInput } from '../../utils/components/TextInput';

// assets
import Lingo from "../../assets/hello-lingo.svg"

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

// type
import { NewUser, emptyData } from "../../utils/types/user";

// react utils
import React from 'react';
import { useNavigate } from 'react-router-dom';


// requests
import { createUser } from '../../service/User/createUser';


export default function SignUp() {
    const [newUser, setNewUser] = React.useState<NewUser>(emptyData);
    const navigate = useNavigate();
    
    function updateData(addNewUser: Partial<NewUser>) {
        setNewUser({ ...newUser, ...addNewUser });
    }

    async function handleSubmit() {
        try {
            createUser(newUser);
            } 
            catch (error) {
            console.error(error);
        }
        
        navigate("../");
    }

    return (
        <div className='SignUp'>
            <img src={Lingo} />
            <form>
                <h2><b>Sign Up</b> to your account</h2>
                <TextInput 
                    dataTestID="form-input-user"
                    type="text" value={newUser.username} 
                    onChange={ (e) => updateData({ username: e.target.value })} 
                    placeHolder='Username' icon={<PersonIcon htmlColor='var(--green)' />} 
                />
                <TextInput 
                    dataTestID="form-input-email"
                    type="text" value={newUser.email} 
                    onChange={(e) => updateData({ email: e.target.value })} 
                    placeHolder='Email' icon={<MailIcon htmlColor='var(--green)' />} 
                />
                <TextInput 
                    dataTestID="form-input-password"
                    type="password" value={newUser.password} 
                    onChange={(e) => updateData({ password: e.target.value })} 
                    placeHolder='Password' icon={<LockIcon htmlColor='var(--green)' />} 
                />
                <Button onClick={handleSubmit} label="Sign Up" />
            </form>
        </div>
    )
}