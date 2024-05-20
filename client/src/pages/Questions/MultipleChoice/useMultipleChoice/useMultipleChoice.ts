import { useCallback, useMemo, useState } from "react";



export default function useMultipleChoice() {
    
    const phrase = 'Qual a tradução de "dog"?';
    const answers = ['gato', 'cachorro', 'pássaro'];
    const rightAnswer = 1;
    
    const [selectedAnswer, setSelectedAnswer] = useState<number>()
    
    const formStatus:'success'|'fail'|undefined = useMemo(() => {
        if (selectedAnswer === undefined) return undefined;
        else if (selectedAnswer === rightAnswer) return 'success'
        return 'fail';
    }, [answers])

    const handleSelectAnswer = useCallback((id:number) => {
        if (selectedAnswer !== rightAnswer) {
            setSelectedAnswer(id);
        }
    }, [setSelectedAnswer, selectedAnswer])


    return {
        formStatus,
        phrase,
        answers,
        handleSelectAnswer
    }
}