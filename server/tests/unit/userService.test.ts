import { User } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";
import { UserWithPassword } from "../../src/models/UserModel";
import userService from "../../src/services/UserService";

jest.mock("../../src/database/prismaClient", () => ({
    prisma: {
        user: {
            findMany: jest.fn()
        }
    }
}))

describe("getUsers returns a list of users", () => {

    it("Returns a list", async () => {
        prisma.user.findMany = jest.fn().mockResolvedValue([]);
        const users = await userService.getUsers();
        expect(Array.isArray(users)).toBe(true);
    })

    it("Returns the same user in singleton list", async () => {
        const init_user: UserWithPassword = {
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3
        };
        prisma.user.findMany = jest.fn().mockResolvedValue([init_user]);

        const end_users = await userService.getUsers();

        expect(end_users.length).toBe(1);
        const end_user = end_users[0];

        expect(end_user.id).toBe(init_user.id);
        expect(end_user.username).toBe(init_user.username);
        expect(end_user.email).toBe(init_user.email);
        expect(end_user.currentLevel).toBe(init_user.currentLevel);

    })

    it("Does not leak user passwords", async () => {
        const init_user: User = {
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3
        };

        prisma.user.findMany = jest.fn().mockResolvedValue([init_user]);

        const users = await userService.getUsers();
        expect(users.length).toBeGreaterThan(0);
        const user: any = users[0];
        expect(user.password).toBeUndefined();
    })


})