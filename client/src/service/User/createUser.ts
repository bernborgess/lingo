import { NewUser } from "../../utils/types/user";
import { api } from "../api";

export async function createUser(body: NewUser) {
    return await api.post("user/create", body);
}