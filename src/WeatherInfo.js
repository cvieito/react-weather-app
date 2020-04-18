import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <FormattedDate date={props.data.date} />
      <div className="weather-temperature row">
        <div className="col-4">
          <WeatherIcon code={props.data.icon} />
        </div>
        <div className="col-8 current-temperature">
          {props.data.temperature}°
        </div>
      </div>
      <h2 className="text-capitalize">{props.data.description}</h2>
      <ul className="more-info">
        <li>
          Max: {props.data.maxTemp} °{props.printedUnit}
        </li>
        &nbsp;&nbsp;&nbsp;
        <li>
          Min: {props.data.minTemp} °{props.printedUnit}
        </li>
        <br />
        <li>Humidity: {props.data.humidity}%</li>&nbsp;&nbsp;&nbsp;
        <li>
          Wind: {Math.round(props.data.wind)} {props.printedSpeed}
        </li>
      </ul>
    </div>
  );
}
