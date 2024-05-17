import { createContext, useContext, useState } from "react";
import { api } from "../../service/api";
import { User, UserData } from '../types/user';



interface AuthContextState {
  user: UserData;
  signIn({ username, password }:  User): Promise<void>;
  userLogged(): Promise<UserData | false>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

type Props = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserData>(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userAsJson = JSON.parse(user);
      return userAsJson;
    }

    return {};
  });

  const signIn = async ({ username, password }:   User) => {
    const res = await api.post("user/login", { username, password });
    console.log(res);
    localStorage.setItem("isAuthenticated", "true"); 
  }


  const userLogged = async function (): Promise<UserData | false> {
    try {
      const res = await api.get("user/login");
      let maybeUser = res.data;
      setUser(maybeUser);

      localStorage.setItem("user", JSON.stringify(maybeUser));
      return maybeUser as UserData;
    } catch (err: any) {
      return false;
    }
  };

  let values: AuthContextState = {
    user,
    signIn,
    userLogged
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };