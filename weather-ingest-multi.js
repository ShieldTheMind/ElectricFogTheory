
const axios = require('axios');

const echoNodes = [
  { id: 'Echo-18', lat: 32.4573, lon: -90.1156 },
  { id: 'Echo-21', lat: 40.7128, lon: -74.0060 },
  { id: 'Echo-24', lat: -16.5000, lon: -68.1500 },
  { id: 'Echo-M1', lat: 33.4484, lon: -112.0740 },
  { id: 'Echo-99', lat: 51.5074, lon: -0.1278 }
];

const API_KEY = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

let index = 0;

function fetchWeather(node) {
  const url = `${BASE_URL}?lat=${node.lat}&lon=${node.lon}&appid=${API_KEY}&units=metric`;
  axios.get(url)
    .then(response => {
      const data = response.data;
      console.log(`\n[Weather Update – ${node.id}]`, {
        date: new Date().toISOString().split('T')[0],
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        conditions: data.weather[0].description
      });
    })
    .catch(error => {
      console.error(`Error fetching weather for ${node.id}:`, error.message);
    });
}

// Loop through each echo node every 2 minutes
function scheduleNext() {
  fetchWeather(echoNodes[index]);
  index = (index + 1) % echoNodes.length;
  setTimeout(scheduleNext, 2 * 60 * 1000); // 2 minutes
}

scheduleNext();
