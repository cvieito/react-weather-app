import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherUnits from "./WeatherUnits";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <FormattedDate date={props.data.date} />
      <div className="weather-temperature row">
        <div className="col-4">
          <WeatherIcon code={props.data.icon} />
        </div>
        <div className="col-8">
          <WeatherUnits celsius={props.data.temperature} />
        </div>
      </div>
      <h2 className="text-capitalize">{props.data.description}</h2>
      <ul>
        <li>Max: {Math.round(props.data.maxTemp)}°C</li>&nbsp;&nbsp;&nbsp;
        <li>Min: {Math.round(props.data.minTemp)}°C</li>
        <br />
        <li>Humidity: {props.data.humidity}%</li>&nbsp;&nbsp;&nbsp;
        <li>Wind: {Math.round(props.data.wind * 0.001 * 3600)} km/h</li>
      </ul>
    </div>
  );
}
