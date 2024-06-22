import { useCallback, useState } from "react";
import { answerQuestion } from "../../../../service/Question/answerQuestion";
import { AnswerMultipleChoice } from "../../../../utils/types/question";
import { useParams } from "react-router-dom";

export default function useMultipleChoice(phrase:string, answers:string[]) {
    
    const {level, sequence} = useParams();
    const [selectedAnswer, setSelectedAnswer] = useState<number>()
    const [formStatus, setFormStatus] = useState<'success'|'fail'|undefined>()

    const handleSelectAnswer = useCallback(async (id:number) => {
        setSelectedAnswer(id);
        const body:AnswerMultipleChoice = {
            type: 'MultipleChoice',
            answerId: id,
        }
        console.log({body});
        
        const response = await answerQuestion(level ?? '', sequence ?? '', body);
        const isCorrect = response.is_correct;
        if (isCorrect) {
            setFormStatus('success');
        }
        else {
            setFormStatus('fail');
        }

    }, [setSelectedAnswer, selectedAnswer])


    return {
        formStatus,
        phrase,
        answers,
        handleSelectAnswer
    }
}