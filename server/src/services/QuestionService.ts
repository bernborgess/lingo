import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { Statement } from "../utils/questionUtil";

function removeAnswers(question: QuestionDB): Statement {
    const { answerId, answer, ...statement } = question;
    return statement;
}

class QuestionService {

    getStatement = async (levelSequence: number, sequence: number): Promise<Statement> => {
        const question = await prisma.question.findFirst({
            where: { levelSequence, sequence }
        });

        if (!question) {
            throw new Error("Question not found!");
        }

        return removeAnswers(question);
    }

}

export default new QuestionService();