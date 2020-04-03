import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import Loader from "react-loader-spinner";

import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      iconUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-10">
              <input
                type="search"
                placeholder="Type a city..."
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-1">
              <button type="submit" className="btn" id="btn-search">
                <i class="fas fa-search" />
              </button>
            </div>
            <div className="col-1">
              <button type="submit" className="btn" id="btn-current">
                <i class="fas fa-map-marker-alt" />
              </button>
            </div>
          </div>
        </form>

        <h1>{weatherData.city}</h1>
        <FormattedDate date={weatherData.date} />
        <div className="clearfix weather-temperature">
          <img
            src={weatherData.iconUrl}
            alt={weatherData.description}
            className="float-left"
          ></img>
          <div className="float-left">
            <span id="temperature">{Math.round(weatherData.temperature)}°</span>
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
        <h2 className="text-capitalize">{weatherData.description}</h2>
        <ul>
          <li>Max: {Math.round(weatherData.maxTemp)}°C</li>&nbsp;&nbsp;&nbsp;
          <li>Min: {Math.round(weatherData.minTemp)}°C</li>
          <br />
          <li>Humidity: 63%</li>&nbsp;&nbsp;&nbsp;
          <li>Wind: {Math.round(weatherData.wind * 0.001 * 3600)} km/h</li>
        </ul>
      </div>
    );
  } else {
    const apiKey = "352858b872f9136668a7d5437feb3f30";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return (
      <Loader
        type="TailSpin"
        color="#c7cfd4"
        height={50}
        width={50}
        timeout={3000} //3 secs
      />
    );
  }
}
