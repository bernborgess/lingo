import { Request, Response } from "express";
import levelService from "../services/LevelService";

class LevelController {

    getAllLevels = async (req: Request, res: Response) => {
        try {
            const levels = await levelService.getAllLevels();
            res.json(levels);

        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    startLevel = async (req: Request, res: Response) => {
        try {
            const { levelSeq } = req.params;

            if (isNaN(Number(levelSeq))) {
                throw new Error("Parameter must be numeric");
            }

            const { id } = res.locals.user;

            const nQuestions = await levelService.startLevel(Number(levelSeq), id);
            res.json(nQuestions);

        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

}

export default new LevelController();