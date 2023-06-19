import React, { Suspense } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Spinner } from "flowbite-react";

// import { index as authIndex } from "@api/auth";
// import { index as eventsIndex } from "@api/events";
// import { index as examsIndex } from "@api/exams";
// import { index as gearsIndex } from "@api/gears";
import Guard from "@components/Guard";
import { ADMINISTRATOR, TECHNICIAN, USER } from "@typing/api/auth/users";

import { AuthProvider } from "./hooks/auth";

import "./App.css";

const Login = React.lazy(() => import("@pages/Login"));

const StationsMap = React.lazy(() => import("@pages/stations/StationsMap"));
const StationsList = React.lazy(() => import("@pages/stations/StationsList"));
// const StationsCreate = React.lazy(() => import("@pages/stations/StationsCreate"));
// const StationsUpdate = React.lazy(() => import("@pages/stations/StationsUpdate"));

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

              <Route path="/stations" element={<Outlet />}>
                <Route index element={<Guard el={StationsMap} roles={[USER]} />} />
                <Route path="manage" element={<Outlet />}>
                  <Route index element={<Guard el={StationsList} roles={[TECHNICIAN, ADMINISTRATOR]} />} />
                  {/* <Route index element={<Guard el={StationsCreate} roles={[TECHNICIAN, ADMINISTRATOR]} />} /> */}
                  {/* <Route index element={<Guard el={StationsUpdate} roles={[TECHNICIAN, ADMINISTRATOR]} />} /> */}
                </Route>
              </Route>

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
