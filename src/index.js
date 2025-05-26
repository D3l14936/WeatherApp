document.addEventListener("DOMContentLoaded", function () {
  let apiKey = "f56ddo443f56b76637t0be5d36d0503a";
  let form = document.querySelector("#search-form");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");

  function displayWeather(response) {
    let temperature = Math.round(response.data.temperature.current);
    let cityName = response.data.city;

    cityElement.textContent = cityName;
    tempElement.textContent = temperature;
  }

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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let input = document.querySelector("#search-form-input");
    let city = input.value.trim();

    if (city) {
      searchCity(city);
    }
  });

  // default city when opening app
  searchCity("Oslo");
});
