import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data);
    setLoaded(true);
  }

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

  if (loaded && forecast.city.name === props.city) {
    return (
      <div className="WeatherForecast row">
        {forecast.list.slice(0, 5).map(function (weather) {
          return (
            <div className="col">
              <h4>{formatHours(new Date(weather.dt * 1000))}</h4>
              <WeatherIcon code={weather.weather[0].icon} />
              <div className="weather-forecast-temperature">
                <p>{Math.round(weather.main.temp)}°</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    const apiKey = "352858b872f9136668a7d5437feb3f30";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
