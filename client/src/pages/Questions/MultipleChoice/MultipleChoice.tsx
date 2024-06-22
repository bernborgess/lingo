import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../utils/components/Button'
import QuestionSubmitButton from '../../../utils/components/QuestionStatustButton/QuestionStatusButton';
import './MultipleChoice.css'
import useMultipleChoice from './useMultipleChoice/useMultipleChoice';



type propsType = {
    phrase:string;
    options:string[];
}

export default function MultipleChoice({phrase, options}:propsType) {
    const {level, sequence} = useParams();
    const navigate = useNavigate();
    const { handleSelectAnswer,  formStatus} = useMultipleChoice(phrase, options);

    function nextQuestion() {
        if (formStatus === 'success') {
            const nextSequence = parseInt(sequence ?? '') + 1
            navigate(`/app/Questions/level/${level}/sequence/${nextSequence}`)
        }
    }

    return (
        <div className='MultipleChoice'>
            <h1>{phrase}</h1>

            {options.map((answer, indx) => <Button variant='secondary' label={answer} key={indx} onClick={() => handleSelectAnswer(indx)} />)}
            <QuestionSubmitButton status={formStatus} onClick={nextQuestion} />
        </div>
    )
}