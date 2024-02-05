const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'
const getWeather = async () => {
    try {
        const city = document.getElementById('city').value
        if (!city) {
            alert('Please enter a city')
            return
        }
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(currentWeatherUrl)
        if (!response.ok) {
            alert("Error fetching current weather data. Please try again.");
        }
        const data = await response.json()
        displayWeather(data)
        const result = await fetch(forecastUrl)
        const res = await result.json()
        displayHourlyForecast(res.list)
        function displayWeather(data) {
            const tempInfo = document.getElementById('temp-div')
            const weatherInfo = document.getElementById('weather-info')
            const weatherIcon = document.getElementById('weather-icon')
            const hourlyForecast = document.getElementById('hourly-forecast')

            tempInfo.innerHTML = ''
            weatherInfo.innerHTML = ''
            hourlyForecast.innerHTML = ''

            if (data.cod === '404') {
                weatherInfo.innerHTML = `<p class="text-capitalize">${data.message}</p>`
            } else {
                const cityName = data.name;
                const temperature = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const temperatureHtml = `<p>${temperature}&#8451</p>`
                const weatherHtml = `<p>${cityName}</p>
                <p class="text-capitalize">${description}</p>`

                tempInfo.innerHTML = temperatureHtml
                weatherInfo.innerHTML = weatherHtml
                weatherIcon.src = iconUrl
                weatherIcon.alt = description
                showImage()
            }
        }

        function displayHourlyForecast(hourlyData) {
            const hourlyForecast = document.getElementById('hourly-forecast')
            const next24Hours = hourlyData.slice(0, 8) // Display the next 24 hours (3-hour intervals)
            next24Hours.forEach(item => {
                const dateTime = new Date(item.dt * 1000) // Convert timestamp to milliseconds
                const hour = dateTime.getHours()
                const temperature = Math.round(item.main.temp)
                const iconCode = item.weather[0].icon
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

                const hourlyItemHtml = `<div class="hourly-item">
                        <span>${hour}:00</span>
                        <img src="${iconUrl}" alt="Hourly Weather Icon">
                        <span>${temperature}&#8451</span>
                    </div>`
                hourlyForecast.innerHTML += hourlyItemHtml
            })
        }

        function showImage() {
            const weatherIcon = document.getElementById('weather-icon')
            weatherIcon.style.display = 'block'
        }
    } catch (err) {
        console.log(err);
    }
}