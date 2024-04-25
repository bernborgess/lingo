import express from "express";
import userController from "../controllers/UserController";
import { isLoggedIn } from "../middlewares/auth";

const userRouter = express.Router();

/**
* @swagger
* /user/all:
*   get:
*       summary: Lista usuários registrados
*       tags:
*        - User
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 
*                   Lista de usuários registrados
*           401:
*               description:
*                   Erro Not logged in
*/
userRouter.get("/all", isLoggedIn, userController.index);

/**
* @swagger
* /user/create:
*   post:
*      summary: Cria um usuário
*      tags:
*       - User
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
*      tags:
*       - User
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
*               description: User Logged In Successfully
*         401: 
*               description: Invalid Username or Password
*/
userRouter.post("/login", userController.login);

/**
* @swagger
* /user/:
*   get:
*       summary: Retorna dados do usuario logado
*       tags:
*        - User
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 
*                   Dados do usuário
*           401:
*               description:
*                   Erro Not logged in
*/
userRouter.get("/", isLoggedIn, userController.whoami);

export { userRouter };
