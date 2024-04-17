import jwt from "jsonwebtoken";
import { sign, verify, isLoggedIn, JwtData } from "../../src/middlewares/auth";
import { Request, Response, NextFunction } from "express";

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
    verify: jest.fn(),
    isLoggedIn: jest.fn(),
}));

describe("`sign` works correctly", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        originalEnv = process.env;
    })

    afterEach(() => {
        process.env = originalEnv;
        jest.clearAllMocks();
    })

    it("Fails when JWT_SECRET is not defined", () => {
        delete process.env.JWT_SECRET;
        expect(() => sign({ id: "id", email: "email@email.com" }))
            .toThrow("JWT_SECRET not found");
    })

    it("Works when JWT_SECRET is defined", () => {
        const secret = "secret";
        process.env.JWT_SECRET = secret;
        const mockToken = "token123";
        const jwtData = { id: "id", email: "email@email.com" };

        jwt.sign = jest.fn().mockReturnValue(mockToken);

        const token = sign(jwtData);

        expect(jwt.sign).toHaveBeenCalledWith(jwtData, secret, { expiresIn: "1d" });

        expect(token).toBe(mockToken);
    })

})

// TODO
describe("`verify` can read the token", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        originalEnv = process.env;
    })

    afterEach(() => {
        process.env = originalEnv;
        jest.clearAllMocks();
    })

    it("Fails when JWT_SECRET is not defined", () => {
        delete process.env.JWT_SECRET;
        expect(verify("testToken")).toBe("JWT_SECRET_NOT_FOUND");
    })

    it("Fails when decoded token is a string", () => {
        process.env.JWT_SECRET = "testSecret";
        jwt.verify = jest.fn().mockReturnValue("testDecoded");
        expect(verify("testToken")).toBe("INVALID_TOKEN");
    })

    it("Fails when jwt.verify throws an exception", () => {
        process.env.JWT_SECRET = "testSecret";
        jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        expect(verify("testToken")).toBe("INVALID_TOKEN");
    })

    it("Works when token is valid", () => {
        process.env.JWT_SECRET = "testSecret";
        const testJwtData : JwtData = {id: "testId", email: "testEmail@email.com"};
        jwt.verify = jest.fn().mockImplementation(() => testJwtData);
        expect(verify("testToken")).toBe(testJwtData);
    })

})

// TODO
describe("isLoggedIn middleware allows only logged users", () => {
    it("Fails when there is no token", () => {
        let testReq: any = undefined;
        let testRes: any = undefined;
        let testNext: any = undefined;
        // expect(isLoggedIn(testReq, testRes, testNext)).toBe(Response);
    })
})
