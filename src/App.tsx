import * as React from "react";
import { useEffect } from "react";

import { index as authIndex } from "@api/auth";
import { index as eventsIndex } from "@api/events";
import { index as examsIndex } from "@api/exams";
import { index as gearsIndex } from "@api/gears";

import "./App.css";

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
        alert("API Error");
        console.error(error);
      });
  }, []);

  return <h1>Board n&apos; go</h1>;
};

export default App;
