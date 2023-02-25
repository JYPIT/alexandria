import { createContext, useContext, useEffect, useState } from 'react';
import { login, loginObserver, logout } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    loginObserver((user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
