import { prisma } from "../database/prismaClient";
import userService from "./UserService";


class LevelService {
    getAllLevels = async (): Promise<number[]> => {

        const levels = await prisma.level.findMany();

        if(!levels || levels.length <= 0) {
            throw new Error("Levels not found");
        }

        return levels.map(level => level.sequence);
    }

    startLevel = async (sequence: number, userId: string): Promise<number> => {

        const user = await userService.getUserById(userId);

        if (user.currentLevel < sequence) {
            throw new Error("User did not reach this level");
        }
        
        const level = await prisma.level.findFirst({
            where: { sequence }
        });

        if(!level) {
            throw new Error("Level not found")
        }

        const questions = await prisma.question.findMany({
            where: {
                levelSequence: {
                    equals: sequence
                }
            }
        });

        if(!questions || questions.length <= 0) {
            throw new Error("Questions not found for this level");
        }

        return questions.length;
    }
}

export default new LevelService();