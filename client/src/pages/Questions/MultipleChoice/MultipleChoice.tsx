import { Button } from '../../../utils/components/Button'
import QuestionSubmitButton from '../../../utils/components/QuestionStatustButton/QuestionStatusButton';
import './MultipleChoice.css'
import useMultipleChoice from './useMultipleChoice/useMultipleChoice';

export default function MultipleChoice() {

    const {answers, phrase, handleSelectAnswer,  formStatus} = useMultipleChoice();

    return (
        <div className='MultipleChoice'>
            <h1>{phrase}</h1>

            {answers.map((answer, indx) => <Button variant='secondary' label={answer} key={indx} onClick={() => handleSelectAnswer(indx)} />)}
            <QuestionSubmitButton status={formStatus} onClick={() => alert('next question')} />
        </div>
    )
}