import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    if (city)
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((res) => setWeatherData(res.data));
  }, [city]);
  return (
    <>
      {Object.keys(weatherData).length && (
        <>
          <h2>Weather in {city}</h2>
          <p>
            Temperature:{" "}
            {+(Math.round(weatherData.main.temp - 273.15 + "e+2") + "e-2")} °C
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          ></img>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p key="capital">Capital: {country.capital}</p>
      <p key="area">Area: {country.area}</p>
      <p key="languages">Languages:</p>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt=""></img>
      <Weather city={country.capital} />
    </>
  );
};
const Countries = ({ countries }) => {
  //const [show,setShow]=
  const showDetails = (e) => {
    let div = e.target.nextSibling;
    div.style.display = div.style.display === "block" ? "none" : "block";
  };
  return (
    <>
      {countries.length > 10 ? (
        <p> Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map((country) => (
          <li key={country.cca2}>
            {country.name.common}
            <button onClick={showDetails}>Show</button>
            <div id={country.cca3}>
              <Country country={country} />
            </div>
          </li>
        ))
      )}
    </>
  );
};
const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${query}`)
      .then((res) => {
        if (query === document.querySelector(".searchbar").value)
          setCountries(res.data);
      })
      .catch((err) => setCountries([]));
  }, [query]);

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      Find countries{" "}
      <input className="searchbar" value={query} onChange={updateQuery} />
      <Countries countries={countries} />
    </div>
  );
};

export default App;
