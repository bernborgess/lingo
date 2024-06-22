import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../service/api";



export default function useMultipleChoice(phrase:string, answers:string[]) {
    
    const [selectedAnswer, setSelectedAnswer] = useState<number>()
    
    const formStatus:'success'|'fail'|undefined = useMemo(() => {
        if (selectedAnswer === undefined) return undefined;
        // else if (selectedAnswer === rightAnswer) return 'success'
        // return 'fail';
        api.post('/level/')

    }, [selectedAnswer])

    const handleSelectAnswer = useCallback((id:number) => {
        setSelectedAnswer(id);
    }, [setSelectedAnswer, selectedAnswer])


    return {
        formStatus,
        phrase,
        answers,
        handleSelectAnswer
    }
}