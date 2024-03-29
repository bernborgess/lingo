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

    createUser = async (username: string, email: string, password: string): Promise<void> => {    
        const test_user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email },
                ],
            },
        });
        if (test_user) {
            throw new Error("Account with this email or username already exists");
        }  
        const created_user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: password,
                currentLevel: 0,
            },
        });
    }

    login = async (username: string, password: string): Promise<User> => {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!user) {
            throw new Error("Invalid Username or Password");
        }
        return removePassword(user);
    }
}

export default new UserService();