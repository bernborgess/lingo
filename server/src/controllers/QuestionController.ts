import { Request, Response } from "express";

import questionService from "../services/QuestionService";


class QuestionController {

    getStatement = async (req: Request, res: Response) => {
        try {
            const { levelSeq, questionSeq } = req.params;

            if (isNaN(Number(levelSeq)) || isNaN(Number(questionSeq))) {
                throw new Error("Parameters must be numeric");
            }

            const { id } = res.locals.user;

            const statement = await questionService.getStatement(Number(levelSeq), Number(questionSeq), id);
            res.json(statement)

        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    answerQuestion = async (req: Request, res: Response) => {
        try {
            const { levelSeq, questionSeq } = req.params;
            const  requestBody  = req.body;

            if (isNaN(Number(levelSeq)) || isNaN(Number(questionSeq))) {
                throw new Error("Parameters must be numeric");
            }

            const { id } = res.locals.user;

            const is_correct = await questionService.answerQuestion(Number(levelSeq), Number(questionSeq), id, requestBody);
            res.json({ is_correct });

        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

}

export default new QuestionController();