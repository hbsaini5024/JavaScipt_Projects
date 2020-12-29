// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// b37f41f5e1865c596c6ad477e9bf37cb
const weatherApi = {
    key: "b37f41f5e1865c596c6ad477e9bf37cb",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value)
        getWeatherReport(searchInputBox.value)
        document.querySelector('.weather-body').style.display = "block"
    }

});

// Get Weather Report
function getWeatherReport(city) {

    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {

    console.log(weather)
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp')
    temperature.innerHTML = `${Math.round(weather.main.temp)}&degC`;

    let minMaxTemp = document.getElementById('min-max')
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg:C (min)/${Math.ceil(weather.main.temp_max)}&deg:C (max)`

    let weatherType = document.getElementById('weather')
    weatherType.innerText = `${weather.weather[0].main}`;

    let dateType = document.getElementById('date')
    let todayDate = new Date();
    dateType.innerText = dateManage(todayDate);

    // Changes Background Wallpapers According to the Weather
    if(weatherType.textContent == 'Haze'){

        document.body.style.backgroundImage = "url('sunny.jpg')" 
    }else if(weatherType.textContent == 'Smoke'){

        document.body.style.backgroundImage = "url('fog.jpg')" 
    }else if(weatherType.textContent == 'Clouds'){

        document.body.style.backgroundImage = "url('cloudy.jpg')" 
    }else if(weatherType.textContent == 'Clear'){

        document.body.style.backgroundImage = "url('clear.jpg')" 
    }

}

//Date Manage function
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", 
    "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    

    let year = dateArg.getFullYear(); 
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    console.log(`${date}, ${month}, ${day}, ${year}`)
    return `${date}, ${month}, ${day}, ${year}`
}