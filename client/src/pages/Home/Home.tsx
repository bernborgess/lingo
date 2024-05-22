import { useAuth } from "../../utils/context/AuthContext";
import LevelButton from '../../utils/components/LevelButton/LevelButton'
import './Home.css'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
import React from "react";
import { getCountQuestions } from "../../service/Levels/getCountQuestions";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { getUser, user } = useAuth();
  const navigate = useNavigate();

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
      getCountQuestions(id);
      navigate("./Questions")
    }

    const levels = [1,2,3,4,5]
    return (
        <div className='Home'>
            <div className='Levels'>
                {levels.map((level) => <LevelButton enable={user?.currentLevel == level} onClick={() => handleSelectLevel(level)}/>)}
            </div>
            <img src={LingoPointLeft} alt="LingoPointLeft" />
        </div>
    )
}