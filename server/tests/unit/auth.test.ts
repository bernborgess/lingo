import jwt from "jsonwebtoken";
import { sign } from "../../src/middlewares/auth";

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));


describe("sign works correctly", () => {
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
describe("verify can read the token", () => { })

// TODO
describe("isLoggedIn middleware allows only logged users", () => { })
