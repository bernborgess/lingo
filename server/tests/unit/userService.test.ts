import { User } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";
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
        const init_users: User[] = [{
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3
        }]
        prisma.user.findMany = jest.fn().mockResolvedValue(init_users);
        const end_users = await userService.getUsers();
        expect(end_users).toBe(init_users);
    })

})