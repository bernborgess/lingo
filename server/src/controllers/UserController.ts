import { Request, Response } from "express";
import userService from "../services/UserService";


class UserController {

    index = async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.json(users);
    }

}

export default new UserController();