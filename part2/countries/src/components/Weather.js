import React, { useState, useEffect } from "react";
import axios from "axios";


const Weather = (props) => {
  //console.log(props.state);¨

  /*
    This component makes API calls too much, and my subscribcion of 1000 calls per mont has gone in ten seconds.
  */


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
  }, []);

  //By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
  //The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
  // Therefore the parametr MUST be spceified so the calls to api are limited only when component is rendered!!!

  
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
