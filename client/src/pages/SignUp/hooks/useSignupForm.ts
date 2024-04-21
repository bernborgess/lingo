import { useState } from "react";

type TSignupForm = {
    userName: string;
    email: string;
    password: string;
}

const initialFormState:TSignupForm = {
    userName: '',
    email: '',
    password: '',
}



const useSignUpForm = () => {
    const [signupForm, setSignupForm] = useState(initialFormState)


    function setUserName(e: React.ChangeEvent<HTMLInputElement>){
        setSignupForm({...signupForm, userName:e.target.value});  
    }
    function setUserEmail(e: React.ChangeEvent<HTMLInputElement>){
        setSignupForm({...signupForm, email:e.target.value});  
    }
    function setUserPassword(e: React.ChangeEvent<HTMLInputElement>){
        setSignupForm({...signupForm, password:e.target.value});  
    }

    return {
        signupForm,
        setUserName,
        setUserEmail,
        setUserPassword
    }  
}
export {useSignUpForm}