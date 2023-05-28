// MAIN DATE
let now = new Date();

let mainDate = document.querySelector("#main-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

mainDate.innerHTML = day;

// MAIN TIME
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let startTime = hours + ":" + minutes + " " + ampm;
  return startTime;
}

let mainTime = document.querySelector("#time");
mainTime.innerHTML = formatAMPM(new Date());

// CURRENT TEMP & LOCATION

function defaultPage(response) {
  let defaultTemp = document.querySelector("#main-temp");
  let defaultCity = document.querySelector("#main-city");
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  defaultTemp.innerHTML = `${currentTemperature}°C`;
  defaultCity.innerHTML = `${currentLocation}`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/hr`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  descriptionElement.innerHTML = response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsius = response.data.main.temp;

  function getForecast(coordinates) {
    let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(defaultPage);
}
navigator.geolocation.getCurrentPosition(showPosition);

// CITY INPUT & DISPLAY

function displayWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/hr`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsius = response.data.main.temp;

  function getSearchForecast(coordinates) {
    let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  getSearchForecast(response.data.coord);
}

function showCity(city) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", citySubmit);

//FORECAST
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-3 date1">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <p class="card-text"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></p>
                <p class="card-text">${Math.round(forecastDay.temp.day)}°</p>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//UNIT CONVERSION

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsius * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemperature}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusBack = Math.round(celsius);
  temperatureElement.innerHTML = `${celsiusBack}°C`;
}

let celsius = null;

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
