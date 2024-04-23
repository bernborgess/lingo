import { useState } from "react";

type TSignInForm = {
    userName: string;
    password: string;
}

const initialFormState:TSignInForm = {
    userName: '',
    password: '',
}



const useSignInForm = () => {
    const [signInForm, setSignInForm] = useState(initialFormState)


    function setUserName(e: React.ChangeEvent<HTMLInputElement>){
        setSignInForm({...signInForm, userName:e.target.value});  
    }
    function setUserPassword(e: React.ChangeEvent<HTMLInputElement>){
        setSignInForm({...signInForm, password:e.target.value});  
    }

    return {
        signInForm,
        setUserName,
        setUserPassword
    }  
}
export {useSignInForm}