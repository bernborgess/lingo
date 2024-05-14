import questionService from "../../src/services/QuestionService";

import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";
import { User } from "../../src/models/UserModel";
import userService from "../../src/services/UserService";

jest.mock("../../src/database/prismaClient", () => ({
    prisma: {
        question: {
            findFirst: jest.fn()
        }
    }
}))

jest.mock("../../src/services/UserService", () => ({
    getUserById: jest.fn()
}))


describe("getStatement returns a valid statement", () => {

    it("Returns a statement with valid levelSeq and questionSeq", async () => {
        const question: QuestionDB = {
            id: '66297573db145161e46c203b',
            levelSequence: 1,
            sequence: 1,
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat'],
            answerId: 0
        };

        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 1
        };

        prisma.question.findFirst = jest.fn().mockResolvedValue(question);
        userService.getUserById = jest.fn().mockResolvedValue(user);

        const statement = await questionService.getStatement(1, 1, "userid");

        expect(question).toMatchObject(statement);
    });

    it("Denies user that did not reach the level", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 1
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);

        await expect(questionService.getStatement(2, 1, "userid"))
            .rejects
            .toThrow("User did not reach this level");
    });

    it("Denies user that did not reach the question in the level", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 2,
            currentQuestion: 1
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);

        await expect(questionService.getStatement(2, 2, "userid"))
            .rejects
            .toThrow("User did not reach this question in this level");
    })

    it("Throws an error when the question does not exist", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 1
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(null);

        await expect(questionService.getStatement(1, 1, "userid"))
            .rejects
            .toThrow("Question not found!");
    });

    it("Allows an user that reached the level", async () => {
        const question: QuestionDB = {
            id: '66297573db145161e46c203b',
            levelSequence: 2,
            sequence: 1,
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat'],
            answerId: 0
        };

        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 2,
            currentQuestion: 1
        };

        prisma.question.findFirst = jest.fn().mockResolvedValue(question);
        userService.getUserById = jest.fn().mockResolvedValue(user);

        const statement = await questionService.getStatement(2, 1, "userid");

        expect(question).toMatchObject(statement);
    })


})