import { useEffect, useState } from "react";
import { api } from "../../../service/api";
import { Question } from "../../../utils/types/question";

export function useGetQuestion(level:number, sequence:number):Question | undefined {
    const [question, setQuestion] = useState<Question>();

    useEffect(() => {
        api.get(`/level/${level}/question/${sequence}`)
        .then((res) => {
            setQuestion(res.data);
        })
    }, [level, sequence])

    return question;
}