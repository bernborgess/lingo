import { useEffect, useState } from "react";
import { api } from "../../../service/api";
import { useAuth } from "../../../utils/context/AuthContext";

export interface Statement {
    type: "MultipleChoice" | "Ordering"
    phrase: string;
    options: string[];
}

interface AnswerMultipleChoice {
    type: "MultipleChoice";
    answerId: number;
}

interface AnswerOrdering {
    type: "Ordering";
    answer: string[];
}

export type Answer = AnswerMultipleChoice | AnswerOrdering;

export type QuestionMultipleChoice = Statement & AnswerMultipleChoice;

export type QuestionOrdering = Statement & AnswerOrdering;

export type Question = QuestionMultipleChoice | QuestionOrdering

export function useGetQuestion(level:number, sequence:number):Question | undefined {
    const [question, setQuestion] = useState<Question>();


    useEffect(() => {
        api.get(`/level/${level}/question/${sequence}`)
        .then((res) => {
            setQuestion(res.data);
        })
    }, [])

    return question;
}