import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { User, UserData, emptyUserData } from '../types/user';



interface AuthContextState {
  user: UserData | null;
  signIn({ username, password }:  User): Promise<void>;
  getUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

type Props = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const signIn = async ({ username, password }:   User) => {
    await api.post("user/login", { username, password }).then(getUser);
  }

  const getUser = async () => {
    try {
    const res = await api.get("user");
    const data = res.data;
    setUser(data);
    } catch (_) {
      setUser(emptyUserData);
    }
  }


  useEffect(() => {
    getUser()
  }, []);

  const values: AuthContextState = {
    user,
    signIn,
    getUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };