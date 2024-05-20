// import { useUserData } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'
export default function Home() {
    // const { userData } = useUserData();

    // console.log(userData);
    return (
        <div className='Home'>
            <LevelButton/>
            <LevelButton enable={false}/>
            <LevelButton enable={false}/>
            <LevelButton enable={false}/>
        </div>
    )
}