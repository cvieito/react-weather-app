import React from "react";
import Weather from "./Weather";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="weather-app-wrapper">
          <Weather />
          <footer>
            <a
              href="https://github.com/cvieito/react-weather-app"
              target="_blank"
            >
              Open-source code
            </a>{" "}
            by Catarina Vieito.
          </footer>
        </div>
      </div>
    </div>
  );
}
