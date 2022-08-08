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
const forecastDiv = document.querySelector('.forecast-container');
const spinner = document.querySelector('.loader');
const overlay = document.querySelector('.overlay');

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
    //Data for forecast cards
    // Temp hi, temp low, weather, humidity, time/date
    forecast = await forecastData;
    console.log(forecast.list);
    
    for (let index = 0; index < 40; index++) {
        const fr = forecast.list[index];
        let time = new Date(forecast.list[index].dt*1000);
        if(index < 7){
            createForecastCard(fr, time);
        }
    }
    // for (const fr of forecast.list) {
    //     const time = new Date(data.dt*1000);
    //     createForecastCard(fr, time);
    // }
}

async function submitSearch(event) {
    try {
        showSpinner();
        parseWeatherData(getCurrentWeather(searchInput.value));
        pasreForecastData(getForecast(searchInput.value));
        await sleep(1000);
    } catch (error) {
        console.log(error);
    }
    finally{
        hideSpinner();
    }
}
function createForecastCard(weatherObj, time){
    console.log(weatherObj);
    let cardDiv = document.createElement('div');
    let temp = document.createElement('p');
    temp.textContent = weatherObj.main.temp + "℉";
    let weather = document.createElement('p');
    weather.textContent = weatherObj.weather[0].main;
    let dt = document.createElement('p');
    dt.textContent = time.toLocaleString();
    cardDiv.appendChild(dt);
    cardDiv.appendChild(weather);
    cardDiv.appendChild(temp);
    cardDiv.classList.add('forecast-card');
    forecastDiv.appendChild(cardDiv);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showSpinner(){
    overlay.style.display = 'block';
    spinner.style.display = 'block';
}
function hideSpinner(){
    overlay.style.display = 'none';
    spinner.style.display = 'none';
}
hideSpinner();
