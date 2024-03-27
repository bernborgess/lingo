import { User } from "@prisma/client";
import { prisma } from "../database/prismaClient";

class UserService {

    getUsers = async (): Promise<User[]> => {
        const users = await prisma.user.findMany();
        return users;
    }

}

export default new UserService();