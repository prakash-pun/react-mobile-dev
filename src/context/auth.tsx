import React, { useState } from "react";

interface IUser {
  isAuthenticated: boolean;
  setAuth: (bool: boolean) => void;
}

const AUTH_INITIAL: IUser = {
  isAuthenticated: false,
  setAuth: () => {}
};

const AuthContext = React.createContext(AUTH_INITIAL);

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);
  const signUp = async (email: string, password: string) => {
    setLoading(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
