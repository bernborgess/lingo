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
            currentLevel: 1
        };

        prisma.question.findFirst = jest.fn().mockResolvedValue(question);
        userService.getUserById = jest.fn().mockResolvedValue(user);

        const statement = await questionService.getStatement(1, 1, "userid");

        expect(question).toMatchObject(statement);
    });



})