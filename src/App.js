import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import moment from "moment/moment";

function App() {
  const [data, setData] = useState({});
  const [dataForecast, setDataForecast] = useState([]);
  const [location, setLocation] = useState("");

  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=0079ceef0802940f36f12cc993236e58&units=metric`;
  const searchLocationFeature = () => {
    axios.get(url2).then((res) => {
      const days = [2, 10, 18, 26, 34];
      setDataForecast(days.map((e) => res.data.list[e]));
    });
    setLocation("");
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0079ceef0802940f36f12cc993236e58&units=metric`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      searchLocationFeature();
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="formSearch">
        <input
          className="location-container"
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          value={location}
          placeholder="City..."
        />
      </div>
      <div className="container">
        <div className="weather-side">
          <div className="weather-gradient"></div>
          <div className="date-container">
            <h2 className="date-dayname">{moment().format("dddd")}</h2>
            <span className="date-day">{moment().format("MMMM Do YYYY")}</span>
            <i className="location-icon" data-feather="map-pin"></i>
            <span className="location">{data.name}</span>
          </div>
          <div className="weather-container">
            {data.main ? (
              <img src={`/icons/${data.weather[0].icon}.png`} alt="" />
            ) : null}
            {data.main ? (
              <h1 className="weather-temp">
                {Math.round(data.main.temp.toFixed())}°C
              </h1>
            ) : null}
            {data.main ? (
              <h3 className="weather-desc" id="iconsWeather">
                {data.weather[0].main}
              </h3>
            ) : null}
          </div>
        </div>
        <div className="info-side">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation">
                {" "}
                <span className="title">VISIBILITY</span>
                <span className="value">{data.visibility} m</span>
                <div className="clear"></div>
              </div>
              <div className="humidity">
                {" "}
                <span className="title">HUMIDITY</span>
                {data.main ? (
                  <span className="value">{data.main.humidity} %</span>
                ) : null}
                <div className="clear"></div>
              </div>
              <div className="wind">
                {" "}
                <span className="title">WIND</span>
                {data.main ? (
                  <span className="value">{data.wind.speed} km/h</span>
                ) : null}
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="week-container">
            <ul className="week-list">
              {dataForecast.map((e) => (
                <li className="active">
                  <i className="day-icon" data-feather="sun">
                    {data.main ? (
                      <img src={`/icons/${data.weather[0].icon}.png`} alt="" />
                    ) : null}
                  </i>
                  <span className="day-name">{e.dt_txt}</span>
                  <span className="day-temp">{e.main.temp}°C</span>
                </li>
              ))}
              <div className="clear"></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
