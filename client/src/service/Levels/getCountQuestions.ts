import { api } from "../api";
export async function getCountQuestions(level:string) {
    const res = await api.get(`level/${level}/start`);
    return res.data
}