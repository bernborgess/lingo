// import { useUserData } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
export default function Home() {
    // const { userData } = useUserData();

    // console.log(userData);
    function handleSelectLevel(id:number) {
        console.log('Level'+ id)
    }

    const levels = [2,3,4,5]
    return (
        <div className='Home'>
            <div className='Levels'>
                <LevelButton onClick={() => handleSelectLevel(1)}/>
                {levels.map((level) => <LevelButton enable={false} onClick={() => handleSelectLevel(level)}/>)}
            </div>
            <img src={LingoPointLeft} alt="LingoPointLeft" />
        </div>
    )
}