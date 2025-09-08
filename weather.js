const apiKey = "41203056939b92b48cff1b3ce161c9c2"; // apna OpenWeatherMap API key daalna
const btn = document.getElementById("getWeatherBtn");
const input = document.getElementById("locationInput");
const result = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");

// Weather Data Fetch Function
async function fetchWeather(city) {
  try {
    errorMessage.textContent = "";
    result.innerHTML = "Loading...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Invalid Location");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    result.innerHTML = "";
    errorMessage.textContent = err.message;
  }
}

// Weather Data Display Function
function displayWeather(data) {
  const { name, main, weather,wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  result.innerHTML = `
    <h2 class="ss">${name}</h2>
    <img class="img" src="${iconUrl}" alt="${weather[0].description}">
    <p>${weather[0].description}</p>
    <div class ="weather-details">
   <div class=tem> <p>temperature:<strong>${Math.round(main.temp)}°C</strong></p></div>
    <div> <p >💧 Humidity: ${main.humidity}%</p></div>
     <div><p>🌬️ Wind Speed: ${wind.speed} m/s</p></div>
     <div><p>🔽 Pressure: ${main.pressure} hPa</p></div>
     
  
  `;
}

// Event Listeners
btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    errorMessage.textContent = "Please enter a city name!";
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
