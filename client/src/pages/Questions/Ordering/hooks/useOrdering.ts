import { useCallback, useEffect, useMemo, useState } from "react";

type TWord = {
    label: string;
    id: number;
    isSelected?: boolean
}

type TOptions = TWord[]

const mock: TOptions = [
    {
        id: 0,
        label: "Are",
        isSelected: false
    },
    {
        id: 1,
        label: "you",
        isSelected: false
    },
    {
        id: 2,
        label: "a",
        isSelected: false
    },
    {
        id: 3,
        label: "cat",
        isSelected: false
    },
    {
        id: 4,
        label: "dog",
        isSelected: false
    },
    {
        id: 5,
        label: "goat",
        isSelected: false
    },
]

export function useOrdering(apiOptions:string[]) {
    
    const [options, setOptions] = useState<TOptions>([]);
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

    const submitAnswer = useCallback(() => {
        if (answerStatus === 'success') {
            // vai p/ proxima questão
            alert('proxima questão!')
        }

        // envia resposta
        if (Math.random() > 0.5) {
            setAnswerStatus('success');
        }
        else {
            setAnswerStatus('fail');
            
        }

    }, [selectedWords, answerStatus])

    const disabled = useMemo(() => !selectedWords.length, [selectedWords.length]);

    useEffect(() => {
        const initialOptions = apiOptions.map((opt, index) => ({id: index + 1, label: opt, isSelected: false}))
        setOptions(initialOptions);
        console.log(initialOptions);
        console.log(apiOptions);
        
    }, [])

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