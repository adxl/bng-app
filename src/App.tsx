import React, { Suspense } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { index as authIndex } from "@api/auth";
import { index as eventsIndex } from "@api/events";
import { index as examsIndex } from "@api/exams";
import { index as gearsIndex } from "@api/gears";
import Guard from "@components/Guard";
import Home from "@pages/Home";

import { AuthProvider } from "./hooks/auth";

import "./App.css";

const Login = React.lazy(() => import("@pages/Login"));

const App: React.FC = () => {
  useEffect(() => {
    Promise.all([authIndex(), eventsIndex(), examsIndex(), gearsIndex()])
      .then(([authResponse, eventsResponse, examsResponse, gearsResponse]) => {
        console.log(authResponse.data);
        console.log(eventsResponse.data);
        console.log(examsResponse.data);
        console.log(gearsResponse.data);
      })
      .catch((error) => {
        // alert("API Error");
        console.error(error);
      });
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <Suspense fallback={<Spinner aria-label="Chargement..." color="info" size="xl" />}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Guard el={<Home />} roles={["*"]} />} />
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
