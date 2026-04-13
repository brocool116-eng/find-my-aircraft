async function fetchWeather() {
  const location = document.getElementById('weather-location').value.trim();
  if (!location) { alert('Please enter a location.'); return; }

  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      document.getElementById('wind-speed').textContent = 'Location not found';
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kn`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;

    document.getElementById('wind-speed').textContent = `${current.windspeed} knots`;
    document.getElementById('conditions').textContent = getWeatherDescription(current.weathercode);

  } catch (error) {
    console.error('Weather fetch failed:', error);
    document.getElementById('wind-speed').textContent = 'Error fetching weather';
  }
}

function getWeatherDescription(code) {
  const codes = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Icy fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Rain showers', 95: 'Thunderstorm'
  };
  return codes[code] ?? `Code ${code}`;
}

function initWeather() {
  const btn = document.getElementById('weather-search-btn');
  console.log('initWeather called, button found:', btn);
  if (btn) btn.addEventListener('click', fetchWeather);
}