import { api } from "../api";
export async function getCountQuestions(id:number) {
    const res = await api.get(`level/${id}/start`);
    return res.data
}