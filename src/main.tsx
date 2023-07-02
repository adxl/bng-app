import React from "react";
import ReactDOM from "react-dom/client";

import { setupIonicReact } from "@ionic/react";

import App from "./App";

import "./index.css";

setupIonicReact({ mode: 'md' })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
