import { utilService } from './utils.js'
;(() => {
  const buildWeatherContainer = () => {
    const weatherContainer = document.createElement('div')
    weatherContainer.id = 'weatherContainer'
    weatherContainer.innerHTML = `
      <link rel="stylesheet" href="style.css" />
      <h1 class="headerWeather">Weather</h1>
      <div class="modal">
        <div class="modalContent">
          <span class="close">&times;</span>
          <p class="modalText"></p>
        </div>
      </div>
      <div class="weatherSearch">
        <div class="dropdownWeather">
          <h3>Search By City</h3>
          <div class="selectDropdown">
            <select name="citySelect" class="citySelect"></select>
          </div>
        </div>
        <form id="weatherForm" class="weatherForm">
          <input type="text" name="cityInput" class="cityInput" />
          <button class="weatherSearchBtn" onclick="onSearchCity(event)">
            <span>Search</span>
          </button>
        </form>
      </div>
      <div class="weatherBox">
        <div class="currentWeather"></div>
        <div class="weatherList"></div>
      </div>
    `
    const container = document.getElementById('weatherContainer')
    if (container) {
      container.parentNode.replaceChild(weatherContainer, container)
      return
    }
    document.body.appendChild(weatherContainer)
  }

  const populateCityDropdown = async () => {
    const cities = await utilService.getCities()
    const select = document.querySelector('.citySelect')
    cities.forEach(({ name, country }) => {
      const option = document.createElement('option')
      option.value = name
      option.innerText = `${name}, ${country}`
      select.appendChild(option)
    })

    const DEFAULT_CITY = 'London'
    updateWeather(DEFAULT_CITY)
    select.addEventListener('change', onSelectCity)
  }

  const onSelectCity = (event) => {
    const selectedCity = event.target.value
    updateWeather(selectedCity)
  }

  const onSearchCity = (event) => {
    event.preventDefault()
    try {
      const input = document.querySelector('.cityInput')
      const cityName = input.value
      if (!cityName || cityName === '') {
        openErrorModal()
        return
      }
      updateWeather(cityName)
    } catch (error) {
      openErrorModal()
    }

    const form = document.querySelector('.weatherForm')
    form.reset()
  }

  const updateWeather = async (cityName) => {
    const weather = await fetchWeather(cityName)
    if (weather.error || !weather) {
      openErrorModal()
    }
    renderCurrentWeather(weather)
    renderWeather(weather)
    const header = document.querySelector('.headerWeather')
    header.innerText = `Weather In ${weather.location.name}, ${weather.location.country}`
    const select = document.querySelector('.citySelect')
    select.value = weather.location.name
  }

  const fetchWeather = async (cityName) => {
    const apiKey = '327b017e746e450fa1f80145230412'
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=14&`

    try {
      const response = await fetch(apiUrl)
      const weatherForecast = await response.json()
      return weatherForecast
    } catch (error) {
      console.error('Error fetching weather from API:', error)
      openErrorModal()
      return null
    }
  }

  const renderCurrentWeather = (weather) => {
    const { last_updated: lastUpdated, condition, temp_c: tempC } = weather.current
    const currentDay = new Date(lastUpdated).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    const { text: currentWeatherDescription, icon: currentIcon } = condition
    const iconUrl = `https:${currentIcon}`
    const currentWeatherDiv = document.querySelector('.currentWeather')

    currentWeatherDiv.innerHTML = `
      <div class="currentDay">${currentDay}</div>
      <div class="weather">
        <div class="icon"><img src="${iconUrl}" alt="logo" /></div>
        <div class="description">${currentWeatherDescription}</div>
      </div>
      <div class="currentTemp">${tempC}°C</div>
    `
  }

  const renderWeather = (weather) => {
    const forecast = weather.forecast.forecastday
    console.log(forecast)
    const days = utilService.getDays(forecast)
    const averageTemps = utilService.getAverageTemps(forecast)
    const icons = utilService.getIcons(forecast)
    const weatherDiv = document.querySelector('.weatherList')
    weatherDiv.innerHTML = ''

    days.forEach((day, index) => {
      const temp = averageTemps[index]
      const icon = icons[index]
      const description = forecast[index].day.condition.text
      const iconUrl = `https:${icon}`
      const weatherItem = document.createElement('div')
      weatherItem.classList.add('weatherItem')
      weatherItem.innerHTML = `
        <div class="day">${day}</div>
        <div class="weather">
          <div class="icon">
            <img src="${iconUrl}" alt="logo"/>
          </div>
        </div>
        <div class="descriptionWeather">${description}</div>
        <div class="temp">${temp.toFixed(0)}°C</div>
      `
      weatherDiv.appendChild(weatherItem)
    })
  }

  const openErrorModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'block'

    const modalContent = document.querySelector('.modalContent')
    modalContent.innerHTML = `
      <div class="modalHeader">
        <h2>City Not Found</h2>
      </div>
      <div class="modalBody">
        <p>Please try again</p>
      </div>
      <button class="close">Close</button>
    `

    const closeButton = document.querySelector('.close')
    closeButton.addEventListener('click', closeModal)
  }

  const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'
  }

  window.onSearchCity = onSearchCity
  buildWeatherContainer()
  populateCityDropdown()
})()
