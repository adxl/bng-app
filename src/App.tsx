import React, { Suspense } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Spinner } from "flowbite-react";

// import { index as authIndex } from "@api/auth";
// import { index as eventsIndex } from "@api/events";
// import { index as examsIndex } from "@api/exams";
// import { index as gearsIndex } from "@api/gears";
import Guard from "@components/Guard";

import { AuthProvider } from "./hooks/auth";

import "./App.css";

const Login = React.lazy(() => import("@pages/Login"));
const StationsMap = React.lazy(() => import("@pages/StationsMap"));
const Home = React.lazy(() => import("@pages/Home"));
const Error404 = React.lazy(() => import("@pages/Error404"));

const App: React.FC = () => {
  useEffect(() => {
    // Promise.all([authIndex(), eventsIndex(), examsIndex(), gearsIndex()])
    //   .then(() => {
    //     console.debug("BnG API's OK");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <Suspense fallback={<Spinner aria-label="Chargement..." color="info" size="xl" />}>
          <Router>
            <Routes>
              <Route path="/" element={<Guard el={Home} roles={["*"]} />} />
              <Route path="/login" element={<Login />} />

              <Route path="stations" element={<Guard el={StationsMap} roles={["*"]} />} />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
