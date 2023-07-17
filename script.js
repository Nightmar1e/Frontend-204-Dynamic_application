const apiKey = 'a7b688c1e5e4ebea08568f2e6ef3ede2';
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const weatherForecast = document.getElementById('weatherForecast');

submitButton.addEventListener('click', fetchWeatherData);

cityInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    fetchWeatherData();
  }
});

function fetchWeatherData() {
  const city = cityInput.value.trim();
  if (city === '') {
    return; 
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherForecast(data);
    })
    .catch(error => {
      console.log('An error occurred while fetching weather data:', error);
    });
}

function displayWeatherForecast(data) {
  weatherForecast.innerHTML = '';

  const forecasts = data.list;

  const forecastsByDate = {};
  forecasts.forEach(forecast => {
    const date = forecast.dt_txt.split(' ')[0]; 

    if (!forecastsByDate[date]) {
      forecastsByDate[date] = {
        highTemp: -Infinity,
        lowTemp: Infinity
      };
    }

    const temperature = forecast.main.temp - 273.15; 
    if (temperature > forecastsByDate[date].highTemp) {
      forecastsByDate[date].highTemp = temperature;
    }
    if (temperature < forecastsByDate[date].lowTemp) {
      forecastsByDate[date].lowTemp = temperature;
    }
  });

  Object.keys(forecastsByDate).forEach(date => {
    const formattedDate = new Date(date).toDateString();
    const { highTemp, lowTemp } = forecastsByDate[date];

    const forecastElement = document.createElement('div');
    forecastElement.innerHTML = `<strong>${formattedDate}</strong>: High: ${highTemp.toFixed(2)}°C, Low: ${lowTemp.toFixed(2)}°C`;
    weatherForecast.appendChild(forecastElement);
  });
}
