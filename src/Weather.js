import React from "react";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather">
      <form>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city..."
              className="form-control"
            />
          </div>
          <div className="col-1.5">
            <button type="submit" className="btn btn-light" id="btn-search">
              <i class="fas fa-search" />
            </button>
          </div>
          <div className="col-1.5">
            <button type="submit" className="btn btn-light" id="btn-current">
              <i class="fas fa-map-marker-alt" />
            </button>
          </div>
        </div>
      </form>

      <h1>Lisbon</h1>
      <p>Mon, 14:44</p>
      <div className="clearfix weather-temperature">
        <img
          src="//ssl.gstatic.com/onebox/weather/64/sunny.png"
          className="float-left"
        ></img>
        <div className="float-left">
          <p>
            <span id="temperature">17°</span>
            <a href="#">C</a> | <a href="#">F</a>
          </p>
        </div>
      </div>
      <h2>Clear</h2>
      <ul>
        <li>Max: 21°C</li> <li>Min: 16°C</li> <li>Humidity: 63%</li>{" "}
        <li>Wind: 15 km/h</li>{" "}
      </ul>
    </div>
  );
}
