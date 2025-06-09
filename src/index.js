document.addEventListener("DOMContentLoaded", function () {
  let apiKey = "f56ddo443f56b76637t0be5d36d0503a";
  let form = document.querySelector("#search-form");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  function displayWeather(response) {
    let temperature = Math.round(response.data.temperature.current);
    let cityName = response.data.city;
    let condition = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;
    let icon = `<img src="${response.data.condition.icon_url}"/>`;

    cityElement.textContent = cityName;
    tempElement.textContent = temperature;
    conditionElement.textContent = condition;
    humidityElement.textContent = humidity;
    windElement.textContent = wind;
    iconElement.innerHTML = icon;
  }
  // Search city API
  function searchCity(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios
      .get(apiUrl)
      .then(displayWeather)
      .catch(function (error) {
        alert("City not found 😢");
        console.error(error);
      });
  }

  // Update display city
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let input = document.querySelector("#search-form-input");
    let city = input.value.trim();

    if (city) {
      searchCity(city);
    }
  });

  //update current date and time below the city name
  let now = new Date();
  let timeStamp = document.querySelector("#current-time");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[now.getDay()];
  timeStamp.innerHTML = `${day} ${hours}:${minutes}`;

  //insert forecast into html
  function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast-day">
            <div class="forecast-day-name">Tue</div>
            <div class="forecast-icon">🌤️</div>
            <div class="forecast-temperature">
              <div class="forecast-temp-day">9°</div>
              <div class="forecast-temp-night">5°</div>
            </div>
          </div>
     `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

  // default city when opening app
  searchCity("Oslo");
  displayForecast();
});
