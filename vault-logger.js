
const axios = require('axios');
const fs = require('fs');
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
const LOG_PATH = './vault-log.json';

function fetchWeather(node) {
  const url = `${BASE_URL}?lat=${node.lat}&lon=${node.lon}&appid=${API_KEY}&units=metric`;

  return axios.get(url)
    .then(response => {
      const data = response.data;
      const logEntry = {
        timestamp: new Date().toISOString(),
        echo: node.id,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        condition: data.weather[0].description
      };

      // Append to vault-log.json
      const existing = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH)) : [];
      existing.push(logEntry);
      fs.writeFileSync(LOG_PATH, JSON.stringify(existing, null, 2));

      console.log(`[Logged] ${node.id}:`, logEntry);
    })
    .catch(err => {
      console.error(`Error logging for ${node.id}:`, err.message);
    });
}

function runLoggingCycle() {
  echoNodes.forEach(fetchWeather);
}

// Run every 20 minutes
runLoggingCycle();
setInterval(runLoggingCycle, 20 * 60 * 1000);
