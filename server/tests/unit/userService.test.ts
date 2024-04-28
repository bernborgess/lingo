import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User as UserDB } from "@prisma/client";
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

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

jest.mock("bcryptjs", () => ({
    compare: jest.fn(),
    hash: jest.fn()
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
            currentLevel: 3,
            currentQuestion: 1
        };
        prisma.user.findMany = jest.fn().mockResolvedValue([init_user]);

        const end_users = await userService.getUsers();

        expect(end_users.length).toBe(1);
        const end_user = end_users[0];

        expect(init_user).toMatchObject(end_user);
    })

    it("Does not leak user passwords", async () => {
        const init_user: UserDB = {
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3,
            currentQuestion: 1
        };

        prisma.user.findMany = jest.fn().mockResolvedValue([init_user]);

        const users = await userService.getUsers();
        expect(users.length).toBeGreaterThan(0);
        const user: any = users[0];
        expect(user.password).toBeUndefined();
    })


})

describe("getUserById returns valid users", () => {

    it("Returns the user when id exists", async () => {
        const init_user: UserWithPassword = {
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3,
            currentQuestion: 1
        };
        prisma.user.findFirst = jest.fn().mockResolvedValue(init_user);

        const end_user = await userService.getUserById(init_user.id);

        expect(init_user).toMatchObject(end_user);
    })

    it("Fails if there is no such user", async () => {
        prisma.user.findFirst = jest.fn().mockResolvedValue(null);

        await expect(userService.getUserById("someinvalidid"))
            .rejects
            .toThrow("No user with this id");
    })

    it("Does not leak user passwords", async () => {
        const init_user: UserDB = {
            id: "id",
            username: "fulano",
            email: "fulano@gmail.com",
            password: "senha123",
            currentLevel: 3,
            currentQuestion: 1
        };

        prisma.user.findFirst = jest.fn().mockResolvedValue(init_user);

        const user = await userService.getUserById(init_user.id);
        expect((user as any).password).toBeUndefined();
    })


})

describe("createUser only creates valid users", () => {

    it("Creates an new user with correct values", async () => {
        prisma.user.findFirst = jest.fn().mockResolvedValue(null);
        const username = "somename";
        const email = "some@email.com";
        const password = "somepassword123";
        prisma.user.create = jest.fn().mockResolvedValue({
            id: "someid", currentLevel: 0, currentQuestion: 1,
            email, username, password
        });
        await userService.createUser(username, email, password);
    })

    it("Throws an error when the username is taken", async () => {
        const user: UserDB = {
            id: "someid",
            username: "somename",
            email: "some@email.com",
            password: "somepassword123",
            currentLevel: 0,
            currentQuestion: 1
        };
        prisma.user.findFirst = jest.fn().mockResolvedValue(user);
        prisma.user.create = jest.fn().mockResolvedValue(user);
        await expect(userService.createUser(user.username, user.email, user.password))
            .rejects
            .toThrow("Account with this email or username already exists");
    })

})

describe("login authenticates valid user credentials", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeAll(() => {
        originalEnv = process.env;
        process.env.JWT_SECRET = "someSecret";
    })

    afterAll(() => {
        process.env = originalEnv;
        jest.clearAllMocks();
    })

    it("Logs in a user with correct credentials", async () => {
        const username = "username";
        const password = "password";
        const hashed = password.toUpperCase();
        const user: UserDB = {
            id: "id",
            email: "some@email.com",
            username,
            password: hashed,
            currentLevel: 0,
            currentQuestion: 1
        }

        prisma.user.findFirst = jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockImplementation((a, b) => a.toUpperCase() === b);
        jwt.sign = jest.fn().mockReturnValue("finaljwttoken");

        const token = await userService.login(username, password);
        expect(token).toBe("finaljwttoken");
    })

    it("Rejects a invalid username", async () => {
        const username = "badusername";
        const password = "password";

        prisma.user.findFirst = jest.fn().mockResolvedValue(null);

        await expect(userService.login(username, password))
            .rejects
            .toThrow("Invalid Username or Password");
    })

    it("Rejects incorrect password", async () => {
        const username = "username";
        const password = "password";
        const hashed = await bcrypt.hash(password, 10);
        const user: UserDB = {
            id: "id",
            email: "some@email.com",
            username,
            password: hashed,
            currentLevel: 0,
            currentQuestion: 1
        }

        prisma.user.findFirst = jest.fn().mockResolvedValue(user);

        await expect(userService.login(username, "badpassword"))
            .rejects
            .toThrow("Invalid Username or Password");
    })


})