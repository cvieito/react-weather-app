import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import Loader from "react-loader-spinner";
import WeatherForecast from "./WeatherForecast";

import "./Weather.css";

export default function Weather(props) {
  const weatherMapping = {
    "01d": "clear-day",
    "01n": "clear-night",
    "02d": "partly-cloudy-day",
    "02n": "partly-cloudy-night",
    "03d": "partly-cloudy-day",
    "03n": "partly-cloudy-night",
    "04d": "cloudy-day",
    "04n": "cloudy-night",
    "09d": "rain-day",
    "09n": "rain-night",
    "10d": "rain-day",
    "10n": "rain-night",
    "11d": "thunderstorm-day",
    "11n": "thunderstorm-night",
    "13d": "snow",
    "13n": "snow",
    "50d": "fog-day",
    "50n": "fog-night",
  };

  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
  }

  function search() {
    const apiKey = "352858b872f9136668a7d5437feb3f30";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchLocation(position) {
    const apiKey = "352858b872f9136668a7d5437feb3f30";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleLocationChange(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  if (weatherData.ready) {
    return (
      <div className={`Weather ${weatherMapping[weatherData.icon]}`}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <input
                type="search"
                placeholder="Type a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-1">
              <button type="submit" className="btn" id="btn-search">
                <i className="fas fa-search" />
              </button>
            </div>
            <div className="col-1">
              <button
                type="submit"
                className="btn"
                id="btn-current"
                onClick={handleLocationChange}
              >
                <i className="fas fa-map-marker-alt" />
              </button>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast city={weatherData.city} />
      </div>
    );
  } else {
    search();
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <input
                type="search"
                placeholder="Type a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-1">
              <button type="submit" className="btn" id="btn-search">
                <i className="fas fa-search" />
              </button>
            </div>
            <div className="col-1">
              <button type="submit" className="btn" id="btn-current">
                <i className="fas fa-map-marker-alt" />
              </button>
            </div>
          </div>
        </form>
        <Loader
          type="TailSpin"
          color="#c7cfd4"
          height={50}
          width={50}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}
