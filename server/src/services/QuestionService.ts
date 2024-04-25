import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { Statement } from "../utils/questionUtil";
import userService from "./UserService";

function removeAnswers(question: QuestionDB): Statement {
    const { answerId, answer, ...statement } = question;
    return statement;
}

class QuestionService {

    getStatement = async (levelSequence: number, sequence: number, userId: string): Promise<Statement> => {

        const user = await userService.getUserById(userId);

        if (user.currentLevel < levelSequence) {
            throw new Error("User did not reach this level");
        }

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