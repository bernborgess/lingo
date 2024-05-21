
export interface User {
    username: string,
    password: string
}

export const emptyData = {
    username: "",
    password: "",
    email: ""
}

export interface NewUser extends User {
    email: string,
}

export interface UserData extends Omit<NewUser, 'password'> {
    id: string,
    email: string,
    currentLevel: number,
    currentQuestion: number
}

export const emptyUserData = {
    id: "",
    username: "",
    email: "",
    currentLevel: 0,
    currentQuestion: 0
}