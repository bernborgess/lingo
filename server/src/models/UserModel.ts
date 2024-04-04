
export interface User {
  id: string;
  email: string;
  username: string;
  currentLevel: number;
};

export type UserWithPassword = User & {
  password: string;
}

const u: User = {
  id: "3",
  email: "3",
  username: "joahn",
  currentLevel: 1
};

console.log(u);
