
class UserService {

    // Todo: User type
    getUsers = async (): Promise<string[]> => {
        const users = ["foo", "bar"];
        return users;
    }

}

export default new UserService();