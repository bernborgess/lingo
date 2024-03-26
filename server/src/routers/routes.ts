import express from "express";
import { userRouter } from "./UserRouter";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

export { mainRouter };
