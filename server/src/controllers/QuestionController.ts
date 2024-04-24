import { Request, Response } from "express";

import questionService from "../services/QuestionService";


class QuestionController {

    getStatement = async (req: Request, res: Response) => {
        try {
            const { levelSeq, questionSeq } = req.params;
            if (isNaN(Number(levelSeq)) || isNaN(Number(questionSeq))) {
                throw new Error("Parameters must be numeric");
            }
            const statement = await questionService.getStatement(Number(levelSeq), Number(questionSeq));
            res.json(statement)
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

}

export default new QuestionController();