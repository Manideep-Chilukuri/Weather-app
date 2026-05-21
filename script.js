const API_KEY = 'REPLACE_WITH_YOUR_OPENWEATHERMAP_API_KEY';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const form = document.getElementById('weather-form');
const message = document.getElementById('message');
const output = document.getElementById('weather-output');
const locationName = document.getElementById('location-name');
const weatherCondition = document.getElementById('weather-condition');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

function showMessage(text) {
  message.textContent = text;
}

function resetOutput() {
  output.classList.add('hidden');
}

function displayWeather(data) {
  locationName.textContent = `${data.name}, ${data.sys.country}`;
  weatherCondition.textContent = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  output.classList.remove('hidden');
}

async function fetchWeather(city, country) {
  const query = country ? `${city},${country}` : city;
  const params = new URLSearchParams({
    q: query,
    units: 'metric',
    appid: API_KEY,
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || 'Unable to fetch weather data.';
    throw new Error(errorMessage);
  }

  return response.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = form.city.value.trim();
  const country = form.country.value.trim();

  resetOutput();
  showMessage('');

  if (!city) {
    showMessage('Please enter a city name.');
    return;
  }

  if (!API_KEY || API_KEY === 'REPLACE_WITH_YOUR_OPENWEATHERMAP_API_KEY') {
    showMessage('Add your OpenWeatherMap API key to script.js before using the app.');
    return;
  }

  showMessage('Loading weather...');

  try {
    const data = await fetchWeather(city, country);
    displayWeather(data);
    showMessage('');
  } catch (error) {
    showMessage(error.message || 'Something went wrong. Please try again.');
  }
});
