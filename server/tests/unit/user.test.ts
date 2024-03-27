import userService from "../../src/services/UserService";

describe("getUsers returns a list of users", () => {

    it("Returns a list", async () => {
        // ! FLAKY!
        const users = await userService.getUsers();
        expect(Array.isArray(users)).toBe(true);
    })


})