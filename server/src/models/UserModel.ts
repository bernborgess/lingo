
export interface User {
    id: string;
    email: string;
    username: string;
    currentLevel: number;
    currentQuestion: number;
};

export type UserWithPassword = User & {
    password: string;
}
