import { User } from "../../utils/types/user";
import { api } from "../api";

export async function login(body: User) {
    return await api.post("user/login", body);
}