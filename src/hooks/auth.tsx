import type { ReactElement, ReactNode } from "react";
import React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getCurrentUser, login } from "@api/auth/auth";
import type { User } from "@typing/api/auth/users";

type AuthContextType = {
  _token: string | null;
  setToken: (token: string) => void;
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
};

const defaultAuthContext = {
  _token: "",
  setToken: () => void 0,
  user: {
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    createdAt: null,
  },
  login: () => Promise.resolve(),
  logout: () => void 0,
  refreshUser: () => void 0,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const useAuth = (): AuthContextType => useContext(AuthContext);

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps): ReactElement {
  const [_user, setUser] = useState<User>(defaultAuthContext.user);
  const [_token, setToken] = useState<string | null>(sessionStorage.getItem("bng-token"));

  const refreshUser = () => {
    if (!_token) return;

    getCurrentUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch((_) => {
        sessionStorage.removeItem("bng-token");
        location.href = "/login";
      });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (_token) {
      sessionStorage.setItem("bng-token", _token);
    } else {
      sessionStorage.removeItem("bng-token");
    }

    refreshUser();
  }, [_token]);

  const handleLogin = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      login({ email, password })
        .then(({ data: token }) => {
          setToken("Bearer " + token);
          resolve();
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

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
