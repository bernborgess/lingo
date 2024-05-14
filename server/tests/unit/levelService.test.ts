import { Level as LevelDB, Question as QuestionDB } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";
import levelService from "../../src/services/LevelService";
import userService from "../../src/services/UserService";
import { User } from "../../src/models/UserModel";

jest.mock("../../src/database/prismaClient", () => ({
    prisma: {
        level: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
        },
        question: {
            findMany: jest.fn(),
        }
    }
}));

jest.mock("../../src/services/UserService", () => ({
    getUserById: jest.fn()
}));

describe("getAllLevels returns all levels correctly", () => {

    it("Returns a valid list of levels", async () => {
        const init_levels: LevelDB[] = [
            {
                id: "1",
                sequence: 1
            },
            {
                id: "2",
                sequence: 2
            },
        ];

        const mapped_levels: number[] = [1, 2];

        prisma.level.findMany = jest.fn().mockResolvedValue(init_levels);

        const end_levels = await levelService.getAllLevels();

        expect(end_levels).toMatchObject(mapped_levels);
    });

    it("Fails when there is no levels", async () => {
        prisma.level.findMany = jest.fn().mockResolvedValue([]);
        await expect(levelService.getAllLevels())
            .rejects
            .toThrow("Levels not found")

        prisma.level.findMany = jest.fn().mockResolvedValue(null);
        await expect(levelService.getAllLevels())
            .rejects
            .toThrow("Levels not found")
    });
});

describe("startLevel initiates a level correctly", () => {
    
    it("Returns the number of questions in the level", async () => {
        const user: User = {
            id: "34",
            email: "test@email.com",
            username: "testUser",
            currentLevel: 1,
            currentQuestion: 1,
        };

        const level : LevelDB = {
            id: "1",
            sequence: 1,
        };

        const questions: QuestionDB[] =  [
            {
                id: '1',
                levelSequence: 1,
                sequence: 1,
                type: "Ordering",
                phrase: "Você é um gato?",
                options: ["Are", "you", "a", "cat", "horse", "girl"],
                answer: ["Are", "you", "a", "cat"],
                answerId: 0
            },
            {
                id: "2",
                levelSequence: 1,
                sequence: 2,
                type: "MultipleChoice",
                phrase: "Como você diz gato em inglês?",
                options: ["cat", "man", "and"],
                answer: [""],
                answerId: 0
            }
        ];

        prisma.level.findFirst = jest.fn().mockResolvedValue(level);
        prisma.question.findMany = jest.fn().mockResolvedValue(questions);
        userService.getUserById = jest.fn().mockResolvedValue(user);

        const end_questions = await levelService.startLevel(1, "34");

        expect(end_questions).toBe(questions.length);
    });

    it("Fails when user did not reach the level", async () => {
        const user: User = {
            id: "34",
            email: "test@email.com",
            username: "testUser",
            currentLevel: 1,
            currentQuestion: 2,
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);

        await expect(levelService.startLevel(2, "userid"))
            .rejects
            .toThrow("User did not reach this level");
    });

    it("Fails when level does not exist", async () => {
        const user: User = {
            id: "34",
            email: "test@email.com",
            username: "testUser",
            currentLevel: 1,
            currentQuestion: 2,
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.level.findFirst = jest.fn().mockResolvedValue(null);

        await expect(levelService.startLevel(1, "userid"))
            .rejects
            .toThrow("Level not found");
    });

    it("Fails when there are no questions in the level", async () => {
        const user: User = {
            id: "34",
            email: "test@email.com",
            username: "testUser",
            currentLevel: 1,
            currentQuestion: 1,
        };

        const level : LevelDB = {
            id: "1",
            sequence: 1,
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.level.findFirst = jest.fn().mockResolvedValue(level);
        prisma.question.findMany = jest.fn().mockResolvedValue([]);

        await expect(levelService.startLevel(1, "userid"))
            .rejects
            .toThrow("Questions not found for this level");

        prisma.question.findMany = jest.fn().mockResolvedValue(null);

        await expect(levelService.startLevel(1, "userid"))
            .rejects
            .toThrow("Questions not found for this level");
    });
});