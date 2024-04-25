import { useUserData } from "../../utils/context/AuthContext";

export default function Home() {
    const { userData } = useUserData();

    console.log(userData);
    return (
        <div className='SignUp'>
            Home page
        </div>
    )
}