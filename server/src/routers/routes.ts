import express from "express";
import { questionRouter } from "./QuestionRouter";
import { userRouter } from "./UserRouter";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/level/:levelSeq/question", questionRouter);

export { mainRouter };
