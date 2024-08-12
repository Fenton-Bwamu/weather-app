const apiKey = "96915ce222c554b8426834eac2a24b00"; 
// Stores the API key needed to authenticate requests to the API

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
// Sets the base URL for the OpenWeatherMap API endpoint

const locationInput = document.getElementById("locationInput");
// Selects the location input field for the weather service

const searchButton = document.getElementById("searchButton");
// Selects the search button for triggering the weather request

const cityNameElement = document.getElementById("cityName");
// Selects the city name element to display the weather data

const temperatureElement = document.getElementById("temperature");
// Selects the temperature element to display the weather data

const descriptionElement = document.getElementById("description");
// Selects the description element to display the weather data

const humidityElement = document.getElementById("humidity");
// Selects the humidity element to display the weather data

const windSpeedElement = document.getElementById("windSpeed");
// Selects the wind speed element to display the weather data

const timeElement = document.getElementById("time");
// Selects the time element to display the local time

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherLocation(location);
    }
});

function fetchWeatherLocation(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Couldn't fetch weather");
            }
            return response.json();
        })
        .then((data) => {
            cityNameElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Calculate and display the local time
            const timezoneOffset = data.timezone; // Timezone offset in seconds
            const localTime = new Date(Date.now() + timezoneOffset * 100);
            timeElement.textContent = `Local Time: ${localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            cityNameElement.textContent = "Error fetching data";
            temperatureElement.textContent = "Error fetching data";
            descriptionElement.textContent = "Error fetching data";
            humidityElement.textContent = "Error fetching data";
            windSpeedElement.textContent = "Error fetching data";
            timeElement.textContent = "Error fetching data";
        });
}
