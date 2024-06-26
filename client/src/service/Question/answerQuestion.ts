import { Answer } from "../../utils/types/question";
import { api } from "../api";
export async function answerQuestion(level:string, sequence:string, body:Answer) {
    const res = await api.post(`level/${level}/question/${sequence}/grade`, body);
    return res.data
}