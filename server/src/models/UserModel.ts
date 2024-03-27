
export interface User {
    id: string;
    email: string;
    username: string;
    currentLevel: number;
};

export type UserWithPassword = User & {
    password: string;
}
