import { Request, Response } from "express";
import userService from "../services/UserService";


class UserController {

    index = async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.json(users);
    }

    whoami = async (req: Request, res: Response) => {
        try {
            const { id } = res.locals.user;
            const user = await userService.getUserById(id);
            res.json(user);
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const user = await userService.createUser(username, email, password);
            res.status(201).json(`User ${user.username} Created Successfully`);
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const token = await userService.login(username, password);
            res.cookie('jwt', token, { httpOnly: true, secure: false });
            res.status(200).json({
                message: `Welcome, ${username}!`
            });
        } catch (error: any) {
            res.status(401).json(error.message);
        }
    }

}

export default new UserController();