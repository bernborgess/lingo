import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtData {
    id: string,
    email: string
}

export function sign(data: JwtData): string {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
    return jwt.sign(data,
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}

export function verify(token: string): JwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" {
    if (!process.env.JWT_SECRET)
        return "JWT_SECRET_NOT_FOUND";

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === "string")
            return "INVALID_TOKEN";

        return decoded as JwtData;
    } catch (err) {
        return "INVALID_TOKEN";
    }
}

function getCookie(req: Request) {
    return req.cookies?.jwt ?? null;
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = getCookie(req);
    if (!token)
        return res.status(401).json("Not logged in");

    const decoded = verify(token);
    if (typeof decoded === "string")
        return res.status(401).json("Not logged in");

    res.locals.isLoggedIn = true;
    res.locals.user = decoded;
    next();
}