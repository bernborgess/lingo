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

  function handleSelectLevel(level: string, sequence:number, i:number) {
    console.log(level);
    console.log(i);
    getCountQuestions(level);
    navigate(`./Questions/level/${level}/sequence/${sequence}`)
  }
  
  const levels = useGetLevels();
  return (
    <div className='Home'>
      <div className='Levels' data-testID="card">
        {levels.map((_, i) => <LevelButton dataTestID={`card-button-${i}`} key={i} enable={user == null ? false : user.currentLevel >= i+1} onClick={() => handleSelectLevel(String(i+1), 1, i)} />)}
      </div>
      <img src={LingoPointLeft} alt="LingoPointLeft" />
    </div>
  )
}