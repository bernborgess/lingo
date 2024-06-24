import './Home.css'

import { useAuth } from "../../utils/context/AuthContext";

import LevelButton from '../../utils/components/LevelButton/LevelButton'

import LingoPointLeft from '../../assets/LingoPointLeft.svg'
import { getCountQuestions } from "../../service/Levels/getCountQuestions";
import { useNavigate } from 'react-router-dom';
import useGetLevels from "./useGetLevels";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSelectLevel(level: string, sequence:number) {
    getCountQuestions(level);
    navigate(`./Questions/level/${level}/sequence/${sequence}`)
  }
  
  const levels = useGetLevels();
  return (
    <div className='Home'>
      <div className='Levels'>
        {levels.map((level, i) => <LevelButton key={i} enable={user == null ? false : user.currentLevel >= level} onClick={() => handleSelectLevel(String(level), 1)} />)}
      </div>
      <img src={LingoPointLeft} alt="LingoPointLeft" />
    </div>
  )
}