
fetch('/api/vaultresonance')
  .then(response => response.json())
  .then(data => {
    document.getElementById('solar-data').innerText = `Sunspots: ${data.solar.ss}`;
    document.getElementById('lunar-data').innerText = `Phase: ${data.lunar.Phase}, Illumination: ${data.lunar.Illumination}%`;
    document.getElementById('vault-score').innerText = `VaultScore: ${data.vaultScore}/10`;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
