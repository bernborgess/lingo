import { useAuth } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
import React, { useState } from "react";
// import { getLevels } from "../../service/Levels/getLevels";
// import { Levels, initialLevels } from "../../utils/types/levels";

export default function Home() {
    const { getUser, user } = useAuth();
    // const [levels, setLevels] = useState<Levels>(initialLevels);

    React.useEffect(() => {
        const fetch = async () => {
          try {
            await getUser();
            // let levelsBack = await getLevels();
            // setLevels(levelsBack);
          } catch (err) {
            console.log(err);
          }
        }
        fetch();
      }, []);
      
    function handleSelectLevel(id:number) {
        console.log('Level'+ id)
    }

    const levels = [2,3,4,5]
    return (
        <div className='Home'>
            <div className='Levels'>
                {/* <h1>{JSON.stringify(user)}</h1> */}
                <LevelButton onClick={() => handleSelectLevel(1)}/>
                {levels.map((level) => <LevelButton enable={user?.currentLevel == level} onClick={() => handleSelectLevel(level)}/>)}
            </div>
            <img src={LingoPointLeft} alt="LingoPointLeft" />
        </div>
    )
}