
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