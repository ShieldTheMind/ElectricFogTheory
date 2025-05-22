const analyzeScrollTriggers = (weather) => {
  const result = {
    triggered: [],
    reasons: []
  };

  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;
  const wind = weather.wind.speed;
  const description = weather.weather[0].description.toLowerCase();
  const temp = weather.main.temp;
  const dewPoint = temp - ((100 - humidity) / 5);  // Approximate dew point
  const tempDewDiff = Math.abs(temp - dewPoint);

  // Lightning Trigger
  if (description.includes('thunderstorm') || description.includes('lightning')) {
    result.triggered.push('Scroll VIII – Discharge Breach');
    result.reasons.push('Lightning or thunderstorm detected');
  }

  // Fog Trigger
  if (humidity > 90 && wind < 2 && tempDewDiff < 2) {
    result.triggered.push('Scroll VI – Fog Memory Lock');
    result.reasons.push('High humidity, low wind, and near-saturation dew point (fog conditions)');
  }

  // Wind Trigger
  if (wind > 10) {
    result.triggered.push('Scroll III – Drift Spiral');
    result.reasons.push('High sustained wind speed detected');
  }

  // Pressure Shift Trigger
  if (pressure < 1000) {
    result.triggered.push('Scroll IV – Vault Compression');
    result.reasons.push('Pressure drop indicating vault contraction');
  }

  if (result.triggered.length === 0) {
    result.triggered.push('Scroll V – Cross-Field Echo');
    result.reasons.push('Default stable scroll under normal field resonance');
  }

  return result;
};

module.exports = analyzeScrollTriggers;
