import React, { useState } from "react"
import ForecastCard from "./components/ForecastCard"

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_API_BASE_URL
}

function App() {

  const date =  new Date()
  const day = date.getDay()
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);

  const search = async(evt) => {
    if (evt.key === "Enter") {
      try {
      const weatherResponse = await fetch(`${api.base}weather?q=${query},us&units=imperial&APPID=${api.key}`)
      const weatherData = await weatherResponse.json()
      setWeather(weatherData)
      console.log(weatherData)

      const forecastResponse = await fetch(`${api.base}onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&exclude=minutely,hourly,alerts&APPID=${api.key}`)
      const forecastData = await forecastResponse.json()
      setForecast(forecastData)
      setQuery('')
      setLoading(false);
      } catch (err) {
        alert("Error: Invalid Input") // update error handling
      }
    }
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
        <input type="text" className="search-bar" placeholder="City or ZIP Code"
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
        </div>
        {(!loading) ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{String(date).slice(0,15)}</div>
            </div>
            <div className="weather-box">
              <div className="weather">{weather.weather[0].description}</div>
              <div className="temp">{`${Math.round(weather.main.temp)}°`}</div>  
              <div>High: {`${Math.round(weather.main.temp_max)}°`}</div>
              <div>Low: {`${Math.round(weather.main.temp_min)}°`}</div>
            </div>
            
            <div className="forecast-box">
              {/* use slice to limit # of map items */}
              {[forecast][0].daily.slice(0,6).map((item, index) => // (index+day+1)%7 - add day to index to begin from curr day, 
                                                                   // add 1 to exclude curr day, modulo when it is 7 to return to start of array 
                <ForecastCard key={index} forecast={{ className: "forecast", day: days[(index+day+1)%7], icon: `${item.weather[0].icon}`, 
                max_temp: `${Math.round(item.temp.max)}`, min_temp: `${Math.round(item.temp.min)}`}}/>
              )}
            </div>
        </div>
        ) : (<div className="error">Not Found</div>)}
      </main>
    </div>
  );
}

export default App;
