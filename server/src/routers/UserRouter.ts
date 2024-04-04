import express from "express";
import userController from "../controllers/UserController";

const userRouter = express.Router();

/**
* @swagger
* /user/all:
*   get:
*       summary: Lista usuários registrados
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 
*                   Lista de usuários registrados
*/
userRouter.get("/all", userController.index);

/**
* @swagger
* /user/create:
*   post:
*      summary: Cria um usuário
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          username:
*                              type: string
*                          email:
*                              type: string
*                              format: email 
*                          password:
*                              type: string
*                              format: password
*      responses:
*          200: 
*              description: User Created Successfully
*          400: 
*              description: Account with this email or username already exists
*/
userRouter.post("/create", userController.create);

/**
* @swagger
* /user/login:
*   post:
*      summary: Loga um usuário
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          username:
*                              type: string
*                          password:
*                              type: string
*                              format: password
*      responses:
*         200: 
*              description: User Logged In Successfully
*         401: 
*              description: Invalid Username or Password
*/
userRouter.post("/login", userController.login);

export { userRouter };
