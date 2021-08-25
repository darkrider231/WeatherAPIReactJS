import React, { useState } from 'react';
const api = {
  key: "7e9ca20c8dfcfbac944cd72c6bab54c7",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 32) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F<br />
              Feels Like: {Math.round(weather.main.feels_like)}°F
            </div>
            <div className="weather">{weather.weather.icon}</div>
            <div className="weather">{weather.weather[0].main}</div>
            <div>Humidity: {weather.main.humidity}%</div>
            <div>Wind: {Math.round(weather.wind.speed)}MPH
                   Gust: {Math.round(weather.wind.gust)}MPH</div>
            <div>Highest Temp Today: {Math.round(weather.main.temp_max)}°F </div>
            <div>Cloudiness: {weather.clouds.all}%</div>
          
          <div className="footer">Credit: <a href="https://www.youtube.com/watch?v=GuA0_Z1llYU" target="_blank" rel="noreferrer">Weather App in ReactJS</a></div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;