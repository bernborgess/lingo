import bcrypt from "bcryptjs";
import { prisma } from "../database/prismaClient";
import { sign } from "../middlewares/auth";
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

    getUserById = async (id: string): Promise<User> => {
        const user_with_password =
            await prisma.user.findFirst({ where: { id } });

        if (!user_with_password) {
            throw new Error("No user with this id");
        }

        return removePassword(user_with_password);
    }

    createUser = async (username: string, email: string, password: string): Promise<User> => {
        const test_user = await prisma.user.findFirst({
            where: { OR: [{ username }, { email }] }
        });
        if (test_user) {
            throw new Error("Account with this email or username already exists");
        }
        password = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                email,
                username,
                password,
                currentLevel: 1
            }
        });
    }

    login = async (username: string, password: string): Promise<string> => {
        const user = await prisma.user.findFirst({
            where: { username }
        });
        if (!user) {
            throw new Error("Invalid Username or Password");
        }

        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            throw new Error("Invalid Username or Password");
        }

        const token = sign({
            id: user.id,
            email: user.email
        });

        return token;
    }
}

export default new UserService();