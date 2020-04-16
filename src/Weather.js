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
  const [forecastData, setForecastData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  const [units, setUnits] = useState("metric");
  const [fahrenheit, setFahrenheit] = useState("inactive fahrenheit");
  const [celsius, setCelsius] = useState("active celsius");

  const [printedUnit, setPrintedUnit] = useState("C");

  function displayImperialUnits(event) {
    event.preventDefault();
    setUnits("imperial");
    setFahrenheit("active fahrenheit");
    setCelsius("inactive celsius");
    setPrintedUnit("F");
  }

  function displayMetricUnits(event) {
    event.preventDefault();
    setUnits("metric");
    setFahrenheit("inactive fahrenheit");
    setCelsius("active celsius");
    setPrintedUnit("C");
  }

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      maxTemp: Math.round(response.data.main.temp_max),
      minTemp: Math.round(response.data.main.temp_min),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
    searchForecast();
  }

  function handleForecast(response) {
    setForecastData({
      forecast: response.data,
      ready: true,
    });
  }

  function search() {
    const apiKey = "6330f3f51cd7c7552c33127324f477db";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function searchForecast() {
    const apiKey = "6330f3f51cd7c7552c33127324f477db";

    let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiForecastUrl).then(handleForecast);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function readInput(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function searchLocation(position) {
    const apiKey = "6330f3f51cd7c7552c33127324f477db";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
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
                onChange={readInput}
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
        <div className="row units">
          <a href="/" className={celsius} onClick={displayMetricUnits}>
            C
          </a>
          &nbsp;|&nbsp;
          <a href="/" className={fahrenheit} onClick={displayImperialUnits}>
            F
          </a>
        </div>
        <div className="row">
          <div className="col">
            <WeatherInfo
              data={weatherData}
              units={units}
              printedUnit={printedUnit}
            />
          </div>
        </div>
        <WeatherForecast
          forecast={forecastData.forecast}
          data={forecastData}
          printedUnit={printedUnit}
          units={units}
        />
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
                onChange={readInput}
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
        <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
      </div>
    );
  }
}
