import React from "react";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  // const [loaded, setLoaded] = useState(false);
  // const [forecast, setForecast] = useState(null);

  // function handleResponse(response) {
  //   setForecast(response.data);
  //   console.log(response.data);
  //   setLoaded(true);
  // }

  function formatHours(date) {
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
        {props.data.list.slice(0, 5).map(function (index) {
          return (
            <div className="col" key={index}>
              <h4>{formatHours(props.data.date)}</h4>
              <WeatherIcon code={props.data.icon} />
              <div className="weather-forecast-temperature">
                <p>
                  {props.data.temperature} °{props.temperatureUnits}
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
