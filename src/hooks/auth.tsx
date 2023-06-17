import type { ReactElement, ReactNode } from "react";
import React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getCurrentUser, login } from "@api/auth/auth";
import type { User } from "@typing/api/users";

type AuthContextType = {
  _token: string | null;
  setToken: (token: string) => void;
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  refreshUser: () => void;
};

const defaultAuthContext = {
  _token: "",
  setToken: () => void 0,
  user: {},
  login: () => void 0,
  logout: () => void 0,
  refreshUser: () => void 0,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const useAuth = (): AuthContextType => useContext(AuthContext);

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps): ReactElement {
  const [_user, setUser] = useState<User>({});
  const [_token, setToken] = useState<string | null>(JSON.parse(sessionStorage.getItem("bng-token") || "null"));

  const refreshUser = () => {
    if (!_token) return;

    getCurrentUser(_token)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((_) => {
        sessionStorage.setItem("bng-token", JSON.stringify(null));
        location.href = "/login";
      });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("bng-token", JSON.stringify(_token));
    refreshUser();
  }, [_token]);

  function handleLogin(email: string, password: string) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: token }) => {
          setToken("Bearer " + token);
        })
        .catch((error) => {
          // console.error(error);
          reject(error.response.data);
        });
    });
  }

  const handleChangeToken = (token: string) => setToken(token);

  const handleLogout = useCallback(() => {
    setToken(null);
    location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({
      _token: _token,
      setToken: handleChangeToken,
      user: _user,
      login: handleLogin,
      logout: handleLogout,
      refreshUser: refreshUser,
    }),
    [_token, _user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
