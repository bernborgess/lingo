import { useNavigate, useParams } from "react-router-dom";
import { getCountQuestions } from "../../../service/Levels/getCountQuestions";

export function useGoToNextQuestion() {
    const {level, sequence} = useParams();
    const navigate = useNavigate();

    async function goToNextQuestion() {
        const response = await getCountQuestions(level ?? '');
        const numMaxSequenceAtLevel = response.questionCount;
        
        const nextSequence = parseInt(sequence ?? '') + 1
        if (nextSequence > numMaxSequenceAtLevel) {
            navigate(`/app/`)
        }
        else {
            navigate(`/app/Questions/level/${level}/sequence/${nextSequence}`)
        }
    }

    return {goToNextQuestion};
}