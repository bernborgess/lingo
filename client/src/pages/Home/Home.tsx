import { useAuth } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
import React from "react";
export default function Home() {
    const { getUser, user } = useAuth();

    React.useEffect(() => {
        const fetch = async () => {
          try {
            await getUser();
          } catch (err) {
            console.log(err);
          }
        }
        fetch();
      }, []);
      
    function handleSelectLevel(id:number) {
        console.log('Level'+ id)
    }

    const levels = [1,2,3,4]
    return (
        <div className='Home'>
            <div className='Levels'>
                <h1>{JSON.stringify(user)}</h1>
                <LevelButton onClick={() => handleSelectLevel(1)}/>
                {levels.map((level) => <LevelButton enable={false} onClick={() => handleSelectLevel(level)}/>)}
            </div>
            <img src={LingoPointLeft} alt="LingoPointLeft" />
        </div>
    )
}