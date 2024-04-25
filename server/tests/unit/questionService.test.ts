import questionService from "../../src/services/QuestionService";

import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../../src/database/prismaClient";

jest.mock("../../src/database/prismaClient", () => ({
    prisma: {
        question: {
            findFirst: jest.fn()
        }
    }
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
        prisma.question.findFirst = jest.fn().mockResolvedValue(question);
        const statement = await questionService.getStatement(1, 1);
        expect(question).toMatchObject(statement);
    })

})