import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

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

describe("createUser only creates valid users", () => {

    it("Creates an new user with correct values", async () => {
        prisma.user.findFirst = jest.fn().mockResolvedValue(null);
        const username = "somename";
        const email = "some@email.com";
        const password = "somepassword123";
        prisma.user.create = jest.fn().mockResolvedValue({
            id: "someid", currentLevel: 0,
            email, username, password
        });
        await userService.createUser(username, email, password);
    })

    it("Throws an error when the username is taken", async () => {
        const user: User = {
            id: "someid",
            username: "somename",
            email: "some@email.com",
            password: "somepassword123",
            currentLevel: 0
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
    })

    afterAll(() => {
        process.env = originalEnv;
        jest.clearAllMocks();
    })

    it("Logs in a user with correct credentials", async () => {
        const username = "username";
        const password = "password";
        const hashed = await bcrypt.hash(password, 10);
        const user: User = {
            id: "id",
            email: "some@email.com",
            username,
            password: hashed,
            currentLevel: 0
        }

        prisma.user.findFirst = jest.fn().mockResolvedValue(user);
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
        const user: User = {
            id: "id",
            email: "some@email.com",
            username,
            password: hashed,
            currentLevel: 0
        }

        prisma.user.findFirst = jest.fn().mockResolvedValue(user);

        await expect(userService.login(username, "badpassword"))
            .rejects
            .toThrow("Invalid Username or Password");
    })


})