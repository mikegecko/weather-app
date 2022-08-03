//openweathermap.org API key
const api_key = "5fb856d554082723958ef5f97eed7b3d";
const cityName = "east durham";
const units = "imperial";

//DOM components
const locationSpan = document.querySelector('#location');
const currentWeatherSpan = document.querySelector('#current-weather');
const tempSpan = document.querySelector('#current-temp');
const feelSpan = document.querySelector('#feels-like');
const humiditySpan = document.querySelector('#humidity');

let data;

async function getCurrentWeather(){
    //Returns weather data for location by calling API
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=${units}`);
    const weatherData = await response.json();
    return(weatherData);
}
async function parseWeatherData(weatherData){
    //Return an object with required data
    data = await weatherData;
    WeatherDataPost(data);
    console.log(data);
    console.log(data.main); //Temps
    console.log(data.weather);// Cloud cover / weather
}
function WeatherDataPost (data) {
    currentWeatherSpan.textContent = data.weather[0].description;
    locationSpan.textContent = data.name;
    tempSpan.textContent = data.main.temp;
    feelSpan.textContent = data.main.feels_like;
    humiditySpan.textContent = data.main.humidity;
}
parseWeatherData(getCurrentWeather());