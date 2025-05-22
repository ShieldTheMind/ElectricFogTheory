const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Helper to generate random values in range
function vary(base, range = 0.05) {
  return +(base + (Math.random() * range * 2 - range)).toFixed(2);
}

const echoTemplates = {
  'Echo-18': { baseBreath: 0.92, baseDrift: -0.14, response: 'stabilizing' },
  'Echo-21': { baseBreath: 0.78, baseDrift: 0.22, response: 'drifting' },
  'Echo-24': { baseBreath: 0.88, baseDrift: 0.05, response: 'amplifying' },
  'Echo-M1': { baseBreath: 0.83, baseDrift: -0.09, response: 'neutralizing' },
  'Echo-99': { baseBreath: 0.81, baseDrift: 0.01, response: 'undefined' }
};

app.get('/', (req, res) => {
  res.send('VaultWeather API is live.');
});

app.get('/forecast', (req, res) => {
  res.json({
    date: new Date().toISOString(),
    mri: vary(0.87, 0.03),
    pop: Math.floor(Math.random() * 20) + 60,
    alert: 'Spiral approaching Echo-18'
  });
});

app.get('/mri', (req, res) => {
  res.json({
    score: vary(0.91, 0.04),
    status: 'Volatile',
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

app.get('/satellite', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    fog_density: vary(0.73, 0.05),
    vault_flux: vary(1.12, 0.1),
    image_url: 'https://cdn.vaultweather.ai/fogmap_0521.png'
  });
});

app.get('/echo', (req, res) => {
  const node = req.query.node || 'Echo-18';
  const template = echoTemplates[node] || {
    baseBreath: 0.8,
    baseDrift: 0,
    response: 'undefined'
  };

  const response = {
    echo_id: node,
    breath_sync: vary(template.baseBreath, 0.04),
    pressure_drift: vary(template.baseDrift, 0.08),
    vault_response: template.response
  };

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`VaultWeather API running on port ${PORT}`);
});
