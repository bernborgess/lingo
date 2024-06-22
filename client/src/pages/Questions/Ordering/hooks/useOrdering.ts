import { useCallback, useMemo, useState } from "react";
import { AnswerOrdering } from "../../../../utils/types/question";
import { answerQuestion } from "../../../../service/Question/answerQuestion";
import { useNavigate, useParams } from "react-router-dom";

type TWord = {
    label: string;
    id: number;
    isSelected?: boolean
}

type TOptions = TWord[]

export function useOrdering(apiOptions: string[]) {

    const {level, sequence} = useParams();
    const navigate = useNavigate();
    const initialOptions = apiOptions.map((opt, index) => ({ id: index + 1, label: opt, isSelected: false }))
    const [options, setOptions] = useState<TOptions>(initialOptions);
    const [selectedWords, setSelectedWords] = useState<TOptions>([]);
    const [answerStatus, setAnswerStatus] = useState<'success' | 'fail' | undefined>();


    const handleSelectWord = useCallback((id: number) => {
        const obj = options.find((word: TWord) => word.id === id);

        if (obj) {
            const hasSelectedBefore = selectedWords.some((word) => word.id === id);
            if (!hasSelectedBefore) {
                setSelectedWords([...selectedWords, obj])
            }

            const newOptionsState = options.map((word) => {
                if (word.id === id) {
                    return { ...word, isSelected: true }
                }
                return word
            })
            setOptions(newOptionsState);
        }
    }, [selectedWords, options])

    const handleRemoveWord = useCallback((id: number) => {
        const obj = options.find((word: TWord) => word.id === id);

        if (obj) {
            const updatedList = selectedWords.filter(x => x.id !== id);
            setSelectedWords(updatedList);

            const newOptionsState = options.map((word) => {
                if (word.id === id) {
                    return { ...word, isSelected: false }
                }
                return word
            })
            setOptions(newOptionsState);
        }
    }, [selectedWords, options])

    const submitAnswer = useCallback(async () => {
        if (answerStatus === 'success') {
            const nextSequence = parseInt(sequence ?? '') + 1
            navigate(`/app/Questions/level/${level}/sequence/${nextSequence}`)
        }


        const answer = selectedWords.map(({label}) => (label))
        const body: AnswerOrdering = {
            type: "Ordering",
            answer: answer
        }
        
        const isCorrect = await answerQuestion(level ?? '', sequence ?? '', body);
        
        // envia resposta
        if (isCorrect.is_correct) {
            setAnswerStatus('success');
        }
        else {
            setAnswerStatus('fail');
        }

    }, [selectedWords, answerStatus])

    const disabled = useMemo(() => !selectedWords.length, [selectedWords.length]);

    return {
        disabled,
        options,
        selectedWords,
        answerStatus,
        handleSelectWord,
        handleRemoveWord,
        submitAnswer
    }
}