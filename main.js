//openweathermap.org API key
const api_key = "5fb856d554082723958ef5f97eed7b3d";
//const cityName = "east durham";
const units = "imperial";

//DOM components
const locationSpan = document.querySelector("#location");
const currentWeatherSpan = document.querySelector("#current-weather");
const tempSpan = document.querySelector("#current-temp");
const feelSpan = document.querySelector("#feels-like");
const humiditySpan = document.querySelector("#humidity");
const searchInput = document.querySelector("#location-search");
const searchBtn = document.querySelector("#submit-search");

let data;
let forecast;
searchBtn.addEventListener("click", submitSearch);
searchInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    submitSearch(event);
  }
});

async function getCurrentWeather(cityName) {
  //Returns weather data for location by calling API
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=${units}`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}
async function getForecast(cityName){
    try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=${units}`
        );
        const forecastData = await response.json();
        return forecastData;
      } catch (error) {
        console.log(error);
      }
}
async function parseWeatherData(weatherData) {
  //Return an object with required data
  data = await weatherData;
  currentWeatherSpan.textContent = data.weather[0].main;
  locationSpan.textContent = data.name;
  tempSpan.textContent = data.main.temp;
  feelSpan.textContent = data.main.feels_like;
  humiditySpan.textContent = data.main.humidity;

  console.log(data);
}
async function pasreForecastData(forecastData){
    forecast = await forecastData;
    console.log(forecast);
}
function submitSearch(event) {
  parseWeatherData(getCurrentWeather(searchInput.value));
  pasreForecastData(getForecast(searchInput.value));
}

//parseWeatherData(getCurrentWeather());
