'use client';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '@/utils/weatherService';
import { DEFAULT_CITY, OPENWEATHER_BASE_URL, OPENWEATHER_API_KEY } from '@/utils/constants';

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const buildWeatherUrl = (city) =>
    `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  const fetchFallbackWeather = async () => {
    try {
      const res = await fetch(buildWeatherUrl(DEFAULT_CITY));
      const data = await res.json();

      const fallbackWeather = {
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
      };

      setWeather(fallbackWeather);
      setCityName(data.name);
    } catch (err) {
      console.error('Fallback weather fetch failed:', err);
    }
  };

  const handleSearch = async (city) => {
    try {
      const res = await fetch(buildWeatherUrl(city));
      const data = await res.json();

      const searchedWeather = {
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
      };

      setWeather(searchedWeather);
      setCityName(data.name);
      setHasSearched(true);
    } catch (err) {
      console.error('Search weather fetch failed:', err);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const weatherInfo = await fetchWeatherData(latitude, longitude);
          setWeather(weatherInfo);
          setCityName(weatherInfo.city);
        },
        (err) => {
          console.warn('Geolocation failed, using fallback:', err.message);
          fetchFallbackWeather();
        },
        { timeout: 10000 }
      );
    } else {
      fetchFallbackWeather();
    }
  }, []);

  return {
    weather,
    cityName,
    hasSearched,
    handleSearch,
  };
}
