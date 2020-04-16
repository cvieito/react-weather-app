import React from "react";
import WeatherIcon from "./WeatherIcon";

import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  if (props.data.ready) {
    return (
      <div className="WeatherForecast row">
        {props.forecast.list.slice(0, 5).map(function (weather, index) {
          return (
            <div className="col" key={index}>
              <h4>{formatHours(weather.dt * 1000)}</h4>
              <WeatherIcon code={weather.weather[0].icon} />
              <div className="weather-forecast-temperature">
                <p>
                  {Math.round(weather.main.temp)} °{props.printedUnit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
