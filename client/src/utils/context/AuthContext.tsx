import { createContext, useContext, useState } from "react";
import { User, UserData } from '../types/user';
import { login } from "../../service/User/login";

interface PropsAuthContext {
  userData: UserData | {};
  signIn: (user:User) => void;
  // signUp: () => void;
}

const AuthContext = createContext<PropsAuthContext | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState({} as UserData);

  function signIn(user: User) {
    login(user);
  }

  const dataState = {
    userData,
    setUserData,
    signIn
  };

  return (
    <AuthContext.Provider value={dataState}>{children}</AuthContext.Provider>
  );
};

function useUserData() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useUserData must be within AuthProvider")
  return context;
}

export { AuthProvider, useUserData };
