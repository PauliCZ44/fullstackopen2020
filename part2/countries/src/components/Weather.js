import React, { useState, useEffect } from "react";
import axios from "axios";


const Weather = (props) => {
  //console.log(props.state);¨
  const [weatherData, setWeatherData] = useState({})
  const [hasData, setHasData] = useState(false)


  const api_Key = process.env.REACT_APP_API_KEY
  const  baseUrl = "http://api.weatherstack.com"
  const makeCityRequestUrl = city =>
  `${baseUrl}/current?access_key=${api_Key}&query=${city}`;

  useEffect(() => {
    console.log("effect");
    axios.get(makeCityRequestUrl(props.capital))
        .then((response) => {
        const apiResponse = response.data;
        console.log(response)
        if (apiResponse.data.error.code == 104) {
            setHasData(false) 
        } else {
        setWeatherData({
            temp: apiResponse.current.temperature,
            icon: apiResponse.current.weather_icons[0],
            windSpeed: apiResponse.current.wind_speed,
            windDir: apiResponse.current.wind_dir
        })
        setHasData(true)
        }
    });
  });
  
  console.log(process.env.REACT_APP_API_KEY)
  return hasData ? (
    <>
      <h2>Weather in {props.capital}</h2>
    <p><strong>Temperature:</strong> {weatherData.temp} celsius</p>
    <p> <img src={weatherData.icon} alt="icon" /></p>
    <p><strong>Wind:</strong> {weatherData.windSpeed} mph direction {weatherData.windDir}</p>
   </>
  ) : (<p>No data</p>);
};

export default Weather;
