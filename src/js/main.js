import moment from "moment";

const apiKey = '12f341f073de512a02800a32c662071f';/*import.meta.env.VITE_API_KEY;*/
let Lat;
let Lon;

document.getElementById("search-btn").addEventListener("click", () => {

  //function to get user's location
    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          console.error ("Geolocation is not supported by this browser.");
      }
    }
    //store latitude and longitude
    function showPosition (position) {
        Lat = position.coords.latitude;
        Lon = position.coords.longitude;

    //Now that Lat and Lon are available, i will use them to build the weather URLs
    const CurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&units=metric&appid=${apiKey}`;
    const ForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lon}&units=metric&appid=${apiKey}`;

    // Fetch and display weather data
    fetchWeatherData(CurrentWeatherUrl)
        .then(displayCurrentWeather)
        .catch(error => console.error('Error fetching current weather data:', error));

    fetchWeatherData(ForecastUrl)
        .then(displayForecast)
        .catch(error => console.error('Error fetching forecast data:', error));
    }

    // Error handling for geolocation
    function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
        case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
        case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
        case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
    }

    // Call the function to get the user's location
    getLocation();
});

//Fetch weather data from API
async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('#weather-data'); // this is the container in my html to display weather data
    weatherContainer.innerHTML = ''; // Clear previous content

    const section = document.createElement('section');
    section.classList.add('current-weather');

    const weatherIcon = document.createElement('img');
    const currentTemp = document.createElement('p');
    const weatherDesc = document.createElement('p');
    const captionDesc = document.createElement('figcaption');

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    currentTemp.innerHTML = `Current Temperature: ${data.main.temp}&deg;C`;
    weatherDesc.innerHTML = `The Weather Today is:  ${desc}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIcon.setAttribute('width','60');
    weatherIcon.setAttribute('height','70');
    //captionDesc.textContent = `${desc}`;

    section.appendChild(currentTemp);
    section.appendChild(weatherDesc);
    section.appendChild(weatherIcon);
    section.appendChild(captionDesc);

    weatherContainer.appendChild(section);
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

    if (data.list && Array.isArray(data.list)) {
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        dailyData.slice(0, 3).forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

            const date = moment(day.dt_txt).format('MMMM Do, YYYY');
            const temp = `${day.main.temp}&deg;C`;
            const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
            const desc = day.weather[0].description;

            forecastCard.innerHTML = ` 

                <h3>${date}</h3>
                <img src="${icon}" alt="${desc}" loading="lazy" width="50" height="50">
                <p>${desc}</p>
                <p>Temperature: ${temp}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } else {
        console.error('Invalid forecast data structure', data);
    }
}

//get date and time for footer details
var footer = document.querySelector('footer');
    
    
// Get the current year
const currentYear = new Date().getFullYear();

// Update the span element with the current year
document.getElementById('currentyear').textContent = ` \u00A9 ${currentYear}`;

// Get the last modified date of the file
const lastModified = new Date(document.lastModified);

// Format the last modified date as required (e.g., "MM/DD/YYYY HH:MM:SS")
const formattedLastModified = `${lastModified.getMonth() + 1}/${lastModified.getDate()}/${lastModified.getFullYear()} ${lastModified.getHours()}:${lastModified.getMinutes()}:${lastModified.getSeconds()}`;

// Update the paragraph element with the last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${formattedLastModified}`;

