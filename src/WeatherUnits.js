import React, { useState } from "react";

export default function WeatherUnits(props) {
  const [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  function fahrenheit() {
    return Math.round((props.celsius * 9) / 5 + 32);
  }

  if (unit === "celsius") {
    return (
      <div className="WeatherUnits">
        <span id="temperature">{Math.round(props.celsius)}°</span>

        <div className="col units">
          <div className="row">
            <span className="celsius">C</span>
          </div>
          <div className="row">
            <a href="/" className="fahrenheit" onClick={showFahrenheit}>
              F
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="WeatherUnits">
        <span id="temperature">{fahrenheit()}°</span>

        <div className="col units">
          <div className="row">
            <span className="fahrenheit">F</span>
          </div>
          <div className="row">
            <a href="/" className="celsius" onClick={showCelsius}>
              C
            </a>
          </div>
        </div>
      </div>
    );
  }
}
