import { api } from "../api";

export async function getAllUser() {
    return await api.get("user/all");
}