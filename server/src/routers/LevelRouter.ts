import express from "express";
import LevelController from "../controllers/LevelController";
import { isLoggedIn } from "../middlewares/auth";

const levelRouter = express.Router({ mergeParams: true });

/**
 * @swagger
 * /level/:
 *  get:
 *      summary: Recebe levels disponiveis
 *      tags:
 *          - Level
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description:
 *                  Numeros Seq dos levels disponiveis
 */
levelRouter.get("/", isLoggedIn, LevelController.getAllLevels);

/**
 * @swagger
 * /level/{levelSeq}/start:
 *  get:
 *      summary: Recebe quantidade questoes de um level específico e o inicia
 *      tags:
 *          - Level
 *      produces:
 *          - application/json
 *      parameters:
 *            - in: path
 *              name: levelSeq
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Número do Level 
 *      responses:
 *          200:
 *              description:
 *                  Numero de questoes do Level
 *          400:
 *              description:
 *                  Usuario nao atingiu este Level ainda
 */
levelRouter.get("/:levelSeq/start", isLoggedIn, LevelController.startLevel);

export { levelRouter };
