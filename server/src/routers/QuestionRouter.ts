import express from "express";
import QuestionController from "../controllers/QuestionController";

const questionRouter = express.Router({ mergeParams: true });

/**
 * @swagger
 * /level/{levelSeq}/question/{questionSeq}:
 *  get:
 *      summary: Recebe uma questão de um level específico
 *      tags:
 *          - Questions
 *      produces:
 *          - application/json
 *      parameters:
 *            - in: path
 *              name: levelSeq
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Número do Level dessa questão
 *            - in: path
 *              name: questionSeq
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Número da Questão
 *      responses:
 *          200:
 *              description:
 *                  Coisas
 */
questionRouter.get("/:questionSeq", QuestionController.getStatement);

export { questionRouter };
