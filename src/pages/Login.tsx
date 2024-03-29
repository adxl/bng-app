import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "flowbite-react";

import { useAuth } from "../hooks/auth";

const Login: React.FC = () => {
  const { login, _token } = useAuth();

  const [_email, setEmail] = useState<string>("");
  const [_password, setPassword] = useState<string>("");

  const [_error, setError] = useState<string>("");

  function handleEmailChange(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePasswordChange(event: React.FormEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  function handleLogin(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!(_email && _password)) return;

    login(_email, _password).catch((error) => {
      const errorMessage = typeof error.message === "string" ? error.message : "Une erreur est survenue";
      setError(errorMessage);
    });
  }

  if (_token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-20 pt-3">
      <div className="w-full flex justify-center max-h-full h-full">
        <img src="/logo.png" className="w-50 h-50 mb-5" />
      </div>
      <div className="flex justify-center items-center max-w-md w-full py-4 rounded-lg">
        <div className="flex flex-col w-full items-center">
          <h1 className="text-3xl">Board n&apos; Go</h1>
          <p className="text-red-600 font-bold mb-10">{_error}</p>
          <form onSubmit={handleLogin} className="flex flex-col w-full items-center mb-2">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-left">
                Email :
              </label>
              <input
                type="email"
                id="email"
                value={_email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-30 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="pwd" className="block mb-2 text-sm font-medium text-left">
                Mot de passe :
              </label>
              <input
                type="password"
                id="password"
                value={_password}
                onChange={handlePasswordChange}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="●●●●●●●●●●"
              />
            </div>
            <Button type="submit" color="dark" className="hover:bg-gray-800">
              Se connecter
            </Button>
          </form>
          <Link to={"/register"} className="text-md underline">
            <small>Créer un compte</small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
