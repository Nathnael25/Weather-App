import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && location) {
      const [lat, long] = location.split(",");
      const apiKey = "ce6951d1d3ecd55bb5163f96c605a650";
      const units = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad response from server");
          }
          console.log("success");
          return response.json();
        })
        .then((weatherData) => setData(weatherData))
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="App">
      <button onClick={() => console.log(data)}>data</button>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{Object.keys(data).length === 0 ? "---" : data.name}</p>
          </div>
          <div className="temp">
            {Object.keys(data).length === 0 ? (
              "---"
            ) : data.main ? (
              <h1>{data.main.temp}</h1>
            ) : null}
          </div>
          <div className="description">
            <p>clouds</p>
            {Object.keys(data).length === 0 ? (
              "---"
            ) : data.clouds ? (
              <h1>{data.clouds.all}</h1>
            ) : null}
          </div>
          <div className="bottom">
            <div className="feels">
              {Object.keys(data).length === 0 ? (
                "---"
              ) : data.main ? (
                <p className="bold">{data.main.feels_like}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">20%</p>
              {data.main ? <p>{data.main.humidity}</p> : null}
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
