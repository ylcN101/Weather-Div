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

export const utilService = {
  getCities,
  getDays,
  getAverageTemps,
  getIcons,
}
