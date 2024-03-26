import express from "express";
import userController from "../controllers/UserController";

const userRouter = express.Router();

/**
* @swagger
* /user:
*   get:
*       summary: Lista usuários registrados
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 
*                   Lista de usuários registrados
*/
userRouter.get("/", userController.index);

export { userRouter };
