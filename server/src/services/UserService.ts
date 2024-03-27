import { prisma } from "../database/prismaClient";
import { User, UserWithPassword } from "../models/UserModel";

function removePassword(uwp: UserWithPassword): User {
    const { password, ...user } = uwp;
    return user;
}

class UserService {

    getUsers = async (): Promise<User[]> => {
        const users_with_password: UserWithPassword[] = await prisma.user.findMany();
        return users_with_password.map(removePassword);
    }

}

export default new UserService();