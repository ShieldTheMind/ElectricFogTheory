
document.addEventListener('DOMContentLoaded', () => {
    const forecastTable = document.getElementById('forecast');
    const updatedTime = document.getElementById('last-updated');
    const apiUrl = 'https://vaultweather-api.onrender.com/api/forecast';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            const now = new Date();
            updatedTime.textContent = "Last Updated: " + now.toLocaleString();

            data.forEach(day => {
                const row = document.createElement('tr');

                const dateCell = document.createElement('td');
                const date = new Date(day.date);
                dateCell.textContent = date.toLocaleDateString('en-US', options);

                const highCell = document.createElement('td');
                highCell.textContent = day.temp.max + "°F";

                const lowCell = document.createElement('td');
                lowCell.textContent = day.temp.min + "°F";

                const rainCell = document.createElement('td');
                rainCell.textContent = day.rain + "%";

                const fogCell = document.createElement('td');
                fogCell.textContent = day.fog;

                row.appendChild(dateCell);
                row.appendChild(highCell);
                row.appendChild(lowCell);
                row.appendChild(rainCell);
                row.appendChild(fogCell);

                forecastTable.appendChild(row);
            });
        })
        .catch(error => {
            forecastTable.innerHTML = "<tr><td colspan='5'>Error loading forecast data.</td></tr>";
            console.error("Error fetching forecast:", error);
        });
});
