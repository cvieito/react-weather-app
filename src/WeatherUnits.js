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
      <div className="WeatherUnits row">
        <div className="col-4">
          <span id="temperature">{Math.round(props.celsius)}°</span>
        </div>

        <div className="col-4 units">
          <div className="row">
            <strong className="celsius">C</strong>
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
      <div className="WeatherUnits row">
        <div className="col-4">
          <span id="temperature">{fahrenheit()}°</span>
        </div>
        <div className="col-4 units">
          <div className="row">
            <strong className="fahrenheit">F</strong>
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
