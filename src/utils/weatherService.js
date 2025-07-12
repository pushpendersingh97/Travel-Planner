import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function fetchWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const res = await axios.get(url);
  const data = res.data;
  return {
    temp: data.main.temp,
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    city: data.name,
  };
}
