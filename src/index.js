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
  descriptionElement.innerHTML = response.data.weather[0].main;
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

// CURRENT TEMP & LOCATION

function defaultPage(response) {
  let defaultTemp = document.querySelector("#main-temp");
  let defaultCity = document.querySelector("#main-city");
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  defaultTemp.innerHTML = `${currentTemperature}°C`;
  defaultCity.innerHTML = `${currentLocation}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement = response.data.weather[0].description;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(defaultPage);
}
navigator.geolocation.getCurrentPosition(showPosition);
