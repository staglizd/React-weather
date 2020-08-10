import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SocialButton from './components/SocialButton'

import Demo from './containers/demo'
import { card as cardStyle, hr as hrStyle } from './utils/styles'

const api = {
  key: "b1da9a235934bb7f93e8b7d460e1ae10",
  base: "https://api.openweathermap.org/data/2.5/"
}

const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const facebookAppId = '229764898440329';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["siječanj", "veljača", "ožujak", "travanj", "svibanj",
      "lipanj", "srpanj", "kolovoz", "rujan", "listopad",
      "studeni", "prosinac"];
    let days = ["nedjelja", "ponedjeljak", "utorak", "srijeda",
      "četvrtak", "petak", "subota"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (hour < 10) hour = `0${hour}`
    if (minute < 10) minute = `0${minute}`

    return `${day}, ${date}. ${month} ${year}. ${hour}:${minute}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 16)
          ? 'app warm' : 'app')
        : 'app'}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Pretraži..."
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
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}

        
        {/* <div>
          <SocialButton
          provider='facebook'
          appId={facebookAppId}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          >Login With Facebook</SocialButton>
        </div> */}

        <div style={{ ...cardStyle, padding: '1.5rem 2rem', textAlign: 'center'}}>
          <strong>Social login</strong>
          <hr style={hrStyle} />
          <Demo />
        </div>

      </main>

    </div>
  );
}

export default App;
