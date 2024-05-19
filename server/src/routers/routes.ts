import express from "express";
import { levelRouter } from "./LevelRouter";
import { questionRouter } from "./QuestionRouter";
import { userRouter } from "./UserRouter";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/level", levelRouter);
mainRouter.use("/level/:levelSeq/question", questionRouter);


export { mainRouter };
