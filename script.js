;(() => {
  const buildWeatherContainer = () => {
    const weatherContainer = document.createElement('div')
    weatherContainer.id = 'weatherContainer'
    weatherContainer.innerHTML = `
      <style>
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #f5f5f5;
    }
    #weatherContainer {
      padding: 1em;
      gap: 1em;
      display: flex;
      flex-direction: column;
    }
    
    .headerWeather {
      font-size: 1.5em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .weatherBox {
      margin-top: 1.5em;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.313em;
    }
    .weatherSearch {
      gap: 1em;
      display: flex;
      align-items: center;
    }
    .weatherList {
      color: #7a7a7f;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      border-radius: 0.313em;
    }
    
    .weatherItem {
      display: flex;
      flex: 0 0 calc(33.33%);
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 0.5em;
      padding: 1em;
      &:nth-last-child(-n + 3) {
        box-shadow: 0px 0px -0.3px 0px rgba(122, 122, 127, 0.75);
        -webkit-box-shadow: 0px -0.3px 0px 0px rgba(122, 122, 127, 0.75);
        -moz-box-shadow: 0px -0.3px 0px 0px rgba(122, 122, 127, 0.75);
      }
    }
    
    .currentWeather {
      color: #fff;
      width: 50%;
      height: 32em;
      background-color: #202050;
      display: flex;
      justify-content: space-between;
      padding: 3em 0px 1.5em 0px;
      flex-direction: column;
      align-items: center;
      border-radius: 0.313em;
    }
    .currentDay {
      display: flex;
      justify-content: center;
      font-size: 1.5em;
      font-weight: 700;
    }
    .day {
      display: flex;
      justify-content: center;
      font-weight: 700;
    }
    .weather {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .weather img {
      width: 7em;
    }
    .descriptionWeather {
      margin-bottom: 0.5em;
    }
    .temp {
      font-size: 1.2em;
      font-weight: 700;
    }
    .currentTemp {
      font-size: 2em;
      font-weight: 700;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
    }
    .modalContent {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40%;
      height: 40%;
      background-color: #fff;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5em;
      border-radius: 1.25em;
      justify-content: space-evenly;
    }
    .modalHeader {
      padding: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modalBody {
      margin-top: 2em;
      gap: 1.5em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .close {
      margin-top: 8em;
      width: 50%;
      padding: 1em;
      cursor: pointer;
    }
    .dropdownWeather {
      width: 20%;
    }
    .selectDropdown {
      position: relative;
      background-color: #e6e6e6;
      border-radius: 0.25em;
      margin-top: 0.625em;
    }
    .selectDropdown select {
      font-size: 1rem;
      font-weight: normal;
      max-width: 100%;
      padding: 0.5em 1.5em 0.5em 0.625em;
      border: none;
      background-color: transparent;
      appearance: none;
    }
    .selectDropdown select:active,
    .selectDropdown select:focus {
      outline: none;
      box-shadow: none;
    }
    .selectDropdown:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0.5em;
      width: 0;
      height: 0;
      margin-top: -2px;
      border-top: 0.313em solid #aaa;
      border-right: 0.313em solid transparent;
      border-left: 0.313em solid transparent;
    }
    .weatherForm {
      display: flex;
      gap: 1em;
      justify-content: center;
      align-self: end;
    }
    .weatherForm input {
      font-size: 1rem;
      padding: 0.5em 1.5em 0.5em 0.625em;
      border-radius: 0.313em;
      border: none;
      outline: none;
      background-color: #e6e6e6;
      font-size: 1rem;
    }
    
    .weatherForm button:hover {
      background-color: #e6e6e6;
    }
    
    @media (max-width: 945px) {
      .weatherBox {
        flex-direction: column;
      }
      .weatherSearch {
        justify-content: center;
      }
      .dropdownWeather {
        width: 46%;
      }
      .currentWeather {
        width: 100%;
      }
    }
    
    @media (max-width: 596px) {
      .weatherSearch {
        width: 92%;
        flex-direction: column;
        align-self: center;
      }
      .headerWeather {
        font-size: 1em;
      }
      .dropdownWeather h3 {
        margin-left: 4em;
        font-size: 1em;
      }
      .dropdownWeather {
        width: 80%;
      }
      .weatherItem {
        flex: 0 0 calc(50%);
        &:nth-last-child(-n + 3) {
          box-shadow: none;
        }
      }
      .weatherForm {
        width: 85%;
      }
    }
    
    .weatherSearchBtn {
      font-family: 'Montserrat', sans-serif;
      appearance: none;
      background-color: #fafbfc;
      border: 0.063em solid rgba(27, 31, 35, 0.15);
      border-radius: 0.375em;
      box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
      box-sizing: border-box;
      color: #24292e;
      cursor: pointer;
      display: inline-block;
      font-weight: 800;
      list-style: none;
      padding: 0.375em 1em;
      position: relative;
      transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;
      white-space: nowrap;
      word-wrap: break-word;
    }
    
    .weatherSearchBtn:hover {
      background-color: #f3f4f6;
      text-decoration: none;
      transition-duration: 0.1s;
    }
    
    .weatherSearchBtn:disabled {
      background-color: #fafbfc;
      border-color: rgba(27, 31, 35, 0.15);
      color: #959da5;
      cursor: default;
    }
    
    .weatherSearchBtn:active {
      background-color: #edeff2;
      box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
      transition: none 0s;
    }
    
    .weatherSearchBtn:focus {
      outline: 1px transparent;
    }
    
    .weatherSearchBtn:before {
      display: none;
    }
    
    .weatherSearchBtn:-webkit-details-marker {
      display: none;
    }
    
      </style>
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
    const cities = await getCities()
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
    const days = getDays(forecast)
    const averageTemps = getAverageTemps(forecast)
    const icons = getIcons(forecast)
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

  const getCities = async () => {
    const apiUrl = 'https://restcountries.com/v3.1/all'
    try {
      const res = await fetch(apiUrl)
      const countries = await res.json()

      const cities = countries.map(({ capital, name }) => ({
        name: capital,
        country: name.common,
      }))

      return cities
    } catch (error) {
      console.error('Error fetching cities from API:', error)
      return null
    }
  }

  const getDays = (forecast) => {
    const days = []
    forecast.forEach((item) => {
      const date = new Date(item.date)
      const day = date.toLocaleDateString('en-US', { weekday: 'long' })
      if (!days.includes(day)) days.push(day)
    })
    days.shift()
    return days
  }

  const getAverageTemps = (forecast) => {
    const averageTemps = []
    const days = getDays(forecast)
    days.forEach((day) => {
      const dailyForecast = forecast.filter((item) => {
        const date = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })
        return date === day
      })
      const temps = dailyForecast.map((item) => item.day.avgtemp_c)
      const averageTemp = temps.reduce((a, b) => a + b) / temps.length
      averageTemps.push(averageTemp)
    })
    return averageTemps
  }

  const getIcons = (forecast) => {
    const resultIcons = []
    const days = getDays(forecast)
    days.forEach((day) => {
      const dailyForecast = forecast.filter((item) => {
        const date = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })
        return date === day
      })

      const iconsForDay = dailyForecast.map((item) => item.day.condition.icon)
      const mostFrequentIcon = getMostFrequent(iconsForDay)
      resultIcons.push(mostFrequentIcon)
    })

    return resultIcons
  }

  const getMostFrequent = (arr) => {
    const map = {}
    let mostFrequent = arr[0]
    let maxCount = 1

    for (let i = 0; i < arr.length; i++) {
      const el = arr[i]
      if (map[el] == null) map[el] = 1
      else map[el]++
      if (map[el] > maxCount) {
        mostFrequent = el
        maxCount = map[el]
      }
    }

    return mostFrequent
  }

  window.onSearchCity = onSearchCity
  buildWeatherContainer()
  populateCityDropdown()
})()
