const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const OWM_API_KEY = 'a723c030e05a82a5d0277633c3f17687';
const ECHO_COORDINATES = {
  'Echo-18': { lat: 32.4579, lon: -90.1150 }, // Madison, MS
  'Echo-21': { lat: 40.7128, lon: -74.0060 }, // NYC
  'Echo-24': { lat: -14.2350, lon: -69.1920 }, // Andes
  'Echo-M1': { lat: 32.3078, lon: -64.7505 }, // Bermuda / Gulf Stream
  'Echo-99': { lat: 0.0, lon: 0.0 }
};

let cachedWeather = null;
let lastWeatherFetch = 0;
const WEATHER_TTL_MS = 150000; // 2.5 minutes

async function getLiveWeather(lat, lon) {
  const now = Date.now();
  if (cachedWeather && (now - lastWeatherFetch) < WEATHER_TTL_MS) {
    return cachedWeather;
  }

  try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`);
    cachedWeather = res.data;
    lastWeatherFetch = now;
    return cachedWeather;
  } catch (err) {
    console.error('Weather fetch error:', err.message);
    return null;
  }
}

function vary(base, range = 0.05) {
  return +(base + (Math.random() * range * 2 - range)).toFixed(2);
}

app.get('/', (req, res) => {
  res.send('VaultWeather API with real weather data is live.');
});

app.get('/forecast', async (req, res) => {
  const loc = ECHO_COORDINATES['Echo-18'];
  const data = await getLiveWeather(loc.lat, loc.lon);
  if (!data) return res.status(500).send('Weather data error');

  const pressure = data.main.pressure;
  const humidity = data.main.humidity;

  res.json({
    date: new Date().toISOString(),
    mri: +(pressure / 1050).toFixed(2),
    pop: +(humidity * 0.8).toFixed(0),
    alert: data.weather[0].description
  });
});

app.get('/mri', async (req, res) => {
  const loc = ECHO_COORDINATES['Echo-18'];
  const data = await getLiveWeather(loc.lat, loc.lon);
  if (!data) return res.status(500).send('Weather data error');

  const pressure = data.main.pressure;
  const mri = +(pressure / 1050).toFixed(2);

  res.json({
    score: mri,
    status: mri > 0.89 ? 'Volatile' : 'Stable',
    region: 'Echo-18'
  });
});

app.get('/alerts', (req, res) => {
  res.json({
    region: 'Echo-18',
    type: 'Spiral Surge',
    severity: 'High',
    message: 'Magnetic build-up detected. Field destabilization likely.'
  });
});

app.get('/scroll-status', (req, res) => {
  res.json({
    scroll: 'Scroll V – Cross-Field Echo',
    status: 'active',
    symbol: 'echo-loop'
  });
});

app.get('/echo', async (req, res) => {
  const node = req.query.node || 'Echo-18';
  const loc = ECHO_COORDINATES[node] || ECHO_COORDINATES['Echo-18'];
  const data = await getLiveWeather(loc.lat, loc.lon);
  if (!data) return res.status(500).send('Weather data error');

  const pressure = data.main.pressure;
  const humidity = data.main.humidity;

  const response = {
    echo_id: node,
    breath_sync: +(humidity / 100).toFixed(2),
    pressure_drift: +((1013 - pressure) / 100).toFixed(2),
    vault_response: pressure < 1005 ? 'drifting' : 'stabilizing'
  };

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`VaultWeather API (real data) running on port ${PORT}`);
});
