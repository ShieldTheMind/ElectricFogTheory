const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('VaultWeather API is live.');
});

app.get('/forecast', (req, res) => {
  res.json({
    date: '2025-05-21',
    mri: 0.87,
    pop: 65,
    alert: 'Spiral approaching Echo-18'
  });
});

app.get('/mri', (req, res) => {
  res.json({
    score: 0.91,
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
    timestamp: '2025-05-21T21:00Z',
    fog_density: 0.73,
    vault_flux: 1.12,
    image_url: 'https://cdn.vaultweather.ai/fogmap_0521.png'
  });
});

app.get('/echo', (req, res) => {
  const node = req.query.node || 'Echo-18';

  const nodeData = {
    'Echo-18': {
      echo_id: 'Echo-18',
      breath_sync: 0.92,
      pressure_drift: -0.14,
      vault_response: 'stabilizing'
    },
    'Echo-21': {
      echo_id: 'Echo-21',
      breath_sync: 0.85,
      pressure_drift: 0.18,
      vault_response: 'rebounding'
    },
    'Echo-24': {
      echo_id: 'Echo-24',
      breath_sync: 0.78,
      pressure_drift: 0.04,
      vault_response: 'coherent'
    }
  };

  res.json(nodeData[node] || nodeData['Echo-18']);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`VaultWeather API running on port ${PORT}`);
});
