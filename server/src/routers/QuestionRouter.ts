import express from "express";
import QuestionController from "../controllers/QuestionController";
import { isLoggedIn } from "../middlewares/auth";

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
questionRouter.get("/:questionSeq", isLoggedIn, QuestionController.getStatement);


/**
 * @swagger
 * /level/{levelSeq}/question/{questionSeq}/grade:
 *  post:
 *      summary: Responde uma questão de um level específico
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
 *              description: Número da Questão desse level
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         type:
 *                             type: string
 *                         phrase:
 *                             type: string
 *                         options:
 *                             type: array
 *                             items:
 *                                 type: string
 *                         answer:
 *                             type: array
 *                             items:
 *                                 type: string
 *                         answerId:
 *                                 type: integer
 *      responses:
 *          200:
 *              description: User successfully answered the question (correctly or not)
 *          400:
 *              description: User did not reach this level or question or one of them was not found
 */
questionRouter.post("/:questionSeq/grade", isLoggedIn, QuestionController.answerQuestion);

export { questionRouter };
