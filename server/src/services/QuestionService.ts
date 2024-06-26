import { Question as QuestionDB } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { Answer, Question, Statement, grade } from "../utils/questionUtil";
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

        if (user.currentLevel == levelSequence && user.currentQuestion < sequence) {
            throw new Error("User did not reach this question in this level");
        }

        const question = await prisma.question.findFirst({
            where: { levelSequence, sequence }
        });

        if (!question) {
            throw new Error("Question not found!");
        }

        return removeAnswers(question);
    }

    answerQuestion = async (levelSequence: number, sequence: number, userId: string, question: Question): Promise<boolean> => {

        const user = await userService.getUserById(userId);

        if (user.currentLevel < levelSequence) {
            throw new Error("User did not reach this level");
        }

        if (user.currentLevel == levelSequence && user.currentQuestion < sequence) {
            throw new Error("User did not reach this question in this level");
        }

        const answer: Answer | null = await prisma.question.findFirst({
            where: { levelSequence, sequence }
        });

        if (!answer) {
            throw new Error("Question not found!");
        }

        const isCorrect = grade(question, answer);

        if (!isCorrect) return false;

        const level = await prisma.level.findFirst({
            where: { sequence: levelSequence },
            include: {
                _count: {
                    select: { questions: true }
                }
            }
        });



        if (!level) {
            throw new Error("Level not found!");
        }

        const questionCount = level._count.questions;

        if(levelSequence === user.currentLevel) {
            // Last question of level
            if (sequence === questionCount) {
                user.currentLevel++;
                user.currentQuestion = 1;
            }
            else {
                user.currentQuestion++;
            }
    
            // Store user changes
            await prisma.user.update({
                where: { id: userId },
                data: {
                    currentLevel: user.currentLevel,
                    currentQuestion: user.currentQuestion
                }
            });
        }

        return true;
    }

}

export default new QuestionService();