import { useAuth } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
import React from "react";
import { getAllUser } from "../../service/User/getAllUser";
export default function Home() {
    const { getUser, user } = useAuth();

    // React.useEffect(() => {
        const fetch = async () => {
          try {
            await getUser();
            console.log("OLHA O USER");
            console.log(user);
          } catch (err) {
            console.log(err);
          }
        }
        // fetch();
    // }, []);

    async function blablaDoBE(){
        try {
          await getAllUser();
          console.log("OLHA OS USERS");
          console.log(user);
        } catch (err) {
          console.log(err);
        }
      }


    function handleSelectLevel(id:number) {
        console.log('Level'+ id)
    }

    const levels = [1,2,3,4]
    return (
        <div className='Home'>
            <div className='Levels'>
                <LevelButton onClick={() => handleSelectLevel(1)}/>
                {levels.map((level) => <LevelButton enable={false} onClick={() => handleSelectLevel(level)}/>)}
            </div>
            <img src={LingoPointLeft} alt="LingoPointLeft" />
            {/* <LevelButton onClick={() => fetch()}/> */}
            <LevelButton onClick={() => blablaDoBE()}/>
        </div>
    )
}