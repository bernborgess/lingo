import './WriteThis.css';

import lily from '../../../assets/characters/lily.svg'
import SpeechBubble from '../../../components/SpeechBubble/SpeechBubble';
import Chip from '../../../components/Chip/Chip';
import { useWriteThis } from './hooks/useWriteThis';
import { Button } from '../../../components/Button';

export default function WriteThis() {

    const { options, selectedWords, handleSelectWord, handleRemoveWord } = useWriteThis();



    return (
        <div className='WriteThis'>
            <h1><b>Write This in English</b></h1>
            <div>
                <img src={lily} alt='lily' width={300} height={300} />
                <SpeechBubble />
            </div>
            <div className='selectedWordsArea'>
                {selectedWords.map((word) => <Chip label={word.label} key={word.id} onClick={() => handleRemoveWord(word.id)} />)}
            </div>
            <div className='optionsWordsArea'>
                {options.map((word) => <Chip label={word.label} key={word.id} onClick={() => handleSelectWord(word.id)} isSelected={word.isSelected} />)}
            </div>
            <Button label='Submit' onClick={() => alert('submited!')}/>
        </div>
    )
}
