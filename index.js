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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`VaultWeather API running on port ${PORT}`);
});
