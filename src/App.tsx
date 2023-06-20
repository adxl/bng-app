import React, { Suspense } from "react";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Spinner } from "flowbite-react";

import Guard from "@components/Guard";
import { ADMINISTRATOR, INSTRUCTOR, ORGANIZER, TECHNICIAN, USER } from "@typing/api/auth/users";

import { AuthProvider } from "./hooks/auth";

import "./App.css";

const Login = React.lazy(() => import("@pages/Login"));

const StationsMap = React.lazy(() => import("@pages/stations/StationsMap"));
const StationsList = React.lazy(() => import("@pages/stations/StationsList"));
// const StationsCreate = React.lazy(() => import("@pages/stations/StationsCreate"));
// const StationsUpdate = React.lazy(() => import("@pages/stations/StationsUpdate"));

const Placeholder = React.Fragment;

const Home = React.lazy(() => import("@pages/Home"));
const Error404 = React.lazy(() => import("@pages/Error404"));

const App: React.FC = () => {
  return (
    <div id="app">
      <AuthProvider>
        <Suspense fallback={<Spinner aria-label="Chargement..." color="info" size="xl" />}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* ROUTES FOR FRONT OFFICE  */}
              <Route path="/" element={<Guard el={Home} roles={["*"]} />}>
                <Route index element={<Home />} />
                <Route path="stations" element={<Guard el={StationsMap} roles={[USER]} />} />
                <Route path="rides" element={<Guard el={Placeholder} roles={[USER]} />} />
                <Route path="events" element={<Guard el={Placeholder} roles={[USER]} />} />
              </Route>

              {/* ROUTES FOR BACK OFFICE */}
              <Route path="/admin" element={<Outlet />}>
                <Route path="users" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[ADMINISTRATOR]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[ADMINISTRATOR]} />} />
                </Route>
                <Route path="rides" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, TECHNICIAN]} />} />
                </Route>
                <Route path="stations" element={<Outlet />}>
                  <Route index element={<Guard el={StationsList} roles={[ADMINISTRATOR, TECHNICIAN, INSTRUCTOR, ORGANIZER]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                </Route>
                <Route path="vehicles" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, TECHNICIAN, INSTRUCTOR]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                </Route>
                <Route path="reports" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, TECHNICIAN]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[TECHNICIAN]} />} />
                </Route>
                <Route path="exams" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, INSTRUCTOR]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[INSTRUCTOR]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[INSTRUCTOR]} />} />
                </Route>
                <Route path="candidates" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, INSTRUCTOR]} />} />
                </Route>
                <Route path="events" element={<Outlet />}>
                  <Route index element={<Guard el={Placeholder} roles={[ADMINISTRATOR, ORGANIZER]} />} />
                  <Route path="create" element={<Guard el={Placeholder} roles={[ORGANIZER]} />} />
                  <Route path="edit" element={<Guard el={Placeholder} roles={[ORGANIZER]} />} />
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
