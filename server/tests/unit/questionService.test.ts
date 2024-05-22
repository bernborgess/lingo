import questionService from "../../src/services/QuestionService";

import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";
import { User } from "../../src/models/UserModel";
import userService from "../../src/services/UserService";
import { Question, QuestionMultipleChoice, QuestionOrdering } from "../../src/utils/questionUtil";

jest.mock("../../src/database/prismaClient", () => ({
    prisma: {
        question: {
            findFirst: jest.fn()
        },
        level: {
            findFirst: jest.fn()
        },
        user: {
            update: jest.fn()
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

describe("answerQuestion correctly grades and increases level", () => {

    it("Denies user that did not reach the level", async () => {
        const user: User = {
            id: "userid",
            currentLevel: 1,
            currentQuestion: 1
        } as User;

        userService.getUserById = jest.fn().mockResolvedValue(user);

        const q: Question = {} as Question;

        await expect(questionService.answerQuestion(2, 1, user.id, q))
            .rejects
            .toThrow("User did not reach this level");
    });

    it("Denies user that did not reach the question in the level", async () => {
        const user: User = {
            id: "userid",
            currentLevel: 2,
            currentQuestion: 1
        } as User;

        userService.getUserById = jest.fn().mockResolvedValue(user);

        const q: Question = {} as Question;

        await expect(questionService.answerQuestion(2, 2, user.id, q))
            .rejects
            .toThrow("User did not reach this question in this level");
    });

    it("Throws an error when answer is null or undefined", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 3,
            currentQuestion: 34
        };

        const q: Question = {} as Question;

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(null);

        await expect(questionService.answerQuestion(2, 1, user.id, q))
            .rejects
            .toThrow("Question not found!");

        prisma.question.findFirst = jest.fn().mockResolvedValue(undefined);

        await expect(questionService.answerQuestion(2, 1, user.id, q))
            .rejects
            .toThrow("Question not found!");
    });

    it("Returns false if the answer provided to a multiple choice question is incorrect", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 15
        };

        const questionMultipleChoiceDB: QuestionDB = {
            id: '112975a73db145161e46c299b',
            levelSequence: 1,
            sequence: 15,
            type: 'MultipleChoice',
            phrase: 'Como se diz cachorro em inglês?',
            options: ['Pneumonoultramicroscopicsilicovolcanoconiosis', '2-methyl-1,3,5-trinitrobenzene', 'Linus Torvalds', 'Dog'],
            answer: [''],
            answerId: 3
        };

        const questionMultipleChoice: QuestionMultipleChoice = {
            type: "MultipleChoice",
            phrase: 'Como se diz cachorro em inglês?',
            options: ['Pneumonoultramicroscopicsilicovolcanoconiosis', '2-methyl-1,3,5-trinitrobenzene', 'Linus Torvalds', 'Dog'],
            answerId: 2 // answer provided by user
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(questionMultipleChoiceDB);

        await expect(questionService.answerQuestion(1, 15, user.id, questionMultipleChoice)).resolves.toBe(false);
    });

    it("Returns false if the answer provided to an ordering question is incorrect", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 15
        };

        const questionOrderingDB: QuestionDB = {
            id: '112975a73db145161e46c203b',
            levelSequence: 1,
            sequence: 15,
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat'],
            answerId: 0
        };

        const questionOrdering: QuestionOrdering = {
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['You', 'are', 'a', 'cat'] // answer provided by user
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(questionOrderingDB);

        await expect(questionService.answerQuestion(1, 15, user.id, questionOrdering)).resolves.toBe(false);
    });

    it("Throws an error if the level is null or undefined", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 15
        };

        const questionDB: QuestionDB = {
            id: '112975a73db145161e46c203b',
            levelSequence: 1,
            sequence: 15,
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat'],
            answerId: 0
        };

        const question: QuestionOrdering = {
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat']
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(questionDB);
        prisma.level.findFirst = jest.fn().mockResolvedValue(null);

        await expect(questionService.answerQuestion(1, 15, user.id, question))
            .rejects
            .toThrow("Level not found!");

        prisma.level.findFirst = jest.fn().mockResolvedValue(undefined);

        await expect(questionService.answerQuestion(1, 15, user.id, question))
            .rejects
            .toThrow("Level not found!");
    });

    it("Successfully increases question progress if user answers a question correctly", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 1
        };

        const questionDB: QuestionDB = {
            id: '112975a73db145161e46c299b',
            levelSequence: 1,
            sequence: 1,
            type: 'MultipleChoice',
            phrase: 'Como se diz cachorro em inglês?',
            options: ['Pneumonoultramicroscopicsilicovolcanoconiosis', '2-methyl-1,3,5-trinitrobenzene', 'Linus Torvalds', 'Dog'],
            answer: [''],
            answerId: 3
        };

        const question: QuestionMultipleChoice = {
            type: "MultipleChoice",
            phrase: 'Como se diz cachorro em inglês?',
            options: ['Pneumonoultramicroscopicsilicovolcanoconiosis', '2-methyl-1,3,5-trinitrobenzene', 'Linus Torvalds', 'Dog'],
            answerId: 3
        };

        const level: {id: string, sequence: number, _count: { questions: number } } = {
            id: '827392bcb262b31ba123049',
            sequence: 1,
            _count: {
                questions: 2
            }
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(questionDB);
        prisma.level.findFirst = jest.fn().mockResolvedValue(level);
        prisma.user.update = jest.fn().mockResolvedValue(user);

        await expect(questionService.answerQuestion(1, 1, user.id, question)).resolves.toBe(true);

        expect(prisma.user.update).toHaveBeenCalledTimes(1);
        expect(user.currentQuestion).toBe(2);
        expect(user.currentLevel).toBe(1);
    });

    it("Successfully increases question progress if user answers the current level's last question correctly", async () => {
        const user: User = {
            id: "userid",
            email: "user@email.com",
            username: "username",
            currentLevel: 1,
            currentQuestion: 2
        };

        const questionDB: QuestionDB = {
            id: '112975a73db145161e46c203b',
            levelSequence: 1,
            sequence: 2,
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat'],
            answerId: 0
        };

        const question: QuestionOrdering = {
            type: 'Ordering',
            phrase: 'Você é um gato?',
            options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
            answer: ['Are', 'you', 'a', 'cat']
        };

        const level: {id: string, sequence: number, _count: { questions: number } } = {
            id: '827392bcb262b31ba123049',
            sequence: 1,
            _count: {
                questions: 2
            }
        };

        userService.getUserById = jest.fn().mockResolvedValue(user);
        prisma.question.findFirst = jest.fn().mockResolvedValue(questionDB);
        prisma.level.findFirst = jest.fn().mockResolvedValue(level);
        prisma.user.update = jest.fn().mockResolvedValue(user);

        await expect(questionService.answerQuestion(1, 2, user.id, question)).resolves.toBe(true);

        expect(prisma.user.update).toHaveBeenCalledTimes(1);
        expect(user.currentQuestion).toBe(1);
        expect(user.currentLevel).toBe(2);
    });
})