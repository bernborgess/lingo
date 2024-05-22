import { api } from "../api";
export async function getLevels() {
    const res = await api.get("level");
    console.log(res);
    return res.data
}