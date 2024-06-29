import './Ordering.css';

import lily from '../../../assets/characters/lily.svg'
import SpeechBubble from '../../../utils/components/SpeechBubble/SpeechBubble';
import Chip from '../../../utils/components/Chip/Chip';
import { useOrdering } from './hooks/useOrdering';
import QuestionSubmitButton from '../../../utils/components/QuestionStatustButton/QuestionStatusButton';


type propsType = {
    phrase: string;
    apiOptions: string[];
}

export default function Ordering({phrase, apiOptions}: propsType) {

    const { disabled, options, selectedWords, answerStatus, handleSelectWord, handleRemoveWord, submitAnswer } = useOrdering(apiOptions);
    
    return (
        <div className='Ordering'>
            <h1><b>Write This in English</b></h1>
            <div>
                <img src={lily} alt='lily' width={300} height={300} />
                <SpeechBubble text={phrase}/>
            </div>
            <div className='selectedWordsArea'>
                {selectedWords.map((word) => <Chip dataTestID={`word-${word.id}`}  label={word.label} key={word.id} onClick={() => handleRemoveWord(word.id)} />)}
            </div>
            <div className='optionsWordsArea'>
                {options.map((word) => <Chip  dataTestID={`word-${word.id}`} label={word.label} key={word.id} onClick={() => handleSelectWord(word.id)} isSelected={word.isSelected} />)}
            </div>
            <QuestionSubmitButton showSubmitButton disabled={disabled} status={answerStatus} onClick={submitAnswer} />
        </div>
    )
}
