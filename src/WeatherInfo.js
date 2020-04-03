import React from "react";
import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.data.city}</h1>
      <FormattedDate date={props.data.date} />
      <div className="clearfix weather-temperature">
        <img
          src={props.data.iconUrl}
          alt={props.data.description}
          className="float-left"
        ></img>
        <div className="float-left">
          <span id="temperature">{Math.round(props.data.temperature)}°</span>
        </div>
        <div className="col units">
          <div className="row">
            <a href="#" id="celsius">
              C
            </a>
          </div>
          <div className="row">
            <a href="#" id="fahrenheit">
              F
            </a>
          </div>
        </div>
      </div>
      <h2 className="text-capitalize">{props.data.description}</h2>
      <ul>
        <li>Max: {Math.round(props.data.maxTemp)}°C</li>&nbsp;&nbsp;&nbsp;
        <li>Min: {Math.round(props.data.minTemp)}°C</li>
        <br />
        <li>Humidity: 63%</li>&nbsp;&nbsp;&nbsp;
        <li>Wind: {Math.round(props.data.wind * 0.001 * 3600)} km/h</li>
      </ul>
    </div>
  );
}
