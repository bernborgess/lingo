import { useState } from "react";
import { emptyData } from "../../../types/user";


const useSignInForm = () => {
    const [signInForm, setSignInForm] = useState(emptyData)


    function setUserName(e: React.ChangeEvent<HTMLInputElement>){
        setSignInForm({...signInForm, username:e.target.value});  
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