
const axios = require('axios');
require('dotenv').config();

const echoNodes = [
  { id: 'Echo-18', lat: 32.4573, lon: -90.1156 },
  { id: 'Echo-21', lat: 40.7128, lon: -74.0060 },
  { id: 'Echo-24', lat: 16.5000, lon: -68.1500 },
  { id: 'Echo-M1', lat: 33.4484, lon: -112.0740 },
  { id: 'Echo-99', lat: 51.5074, lon: -0.1278 },
  { id: 'Echo-07', lat: 34.0522, lon: -118.2437 },
  { id: 'Echo-12', lat: 35.6895, lon: 139.6917 },
  { id: 'Echo-36', lat: -33.8688, lon: 151.2093 },
  { id: 'Echo-44', lat: 55.7558, lon: 37.6173 },
  { id: 'Echo-77', lat: 28.6139, lon: 77.2090 },
];

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

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
      console.error(`Error fetching weather for ${node.id}:`, error.response?.statusText || error.message);
    });
}

// Fetch for all nodes every 20 minutes
function runAll() {
  echoNodes.forEach(fetchWeather);
}

// Initial run
runAll();

// Repeat every 20 minutes
setInterval(runAll, 20 * 60 * 1000);
