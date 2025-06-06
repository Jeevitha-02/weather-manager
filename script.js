const API_KEY = "15af33f75d4ead73ae0788e995eac918"; // Your real API key

function getWeatherData(city, unit) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;

  return fetch(URL)
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error fetching weather data:", err);
    });
}

function searchCity() {
  const city = document.getElementById("city-input").value;
  const unit = document.getElementById("unit-select").value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  getWeatherData(city, unit).then((data) => {
    if (data.cod === 200) {
      showWeatherData(data, unit);
    } else {
      alert("City not found. Try again.");
    }
  });
}

function showWeatherData(data, unit) {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  document.getElementById("city-name").innerText = data.name;
  document.getElementById("weather-type").innerText = data.weather[0].main;
  document.getElementById("temp").innerText = data.main.temp + unitSymbol;
  document.getElementById("min-temp").innerText = data.main.temp_min + unitSymbol;
  document.getElementById("max-temp").innerText = data.main.temp_max + unitSymbol;
}
