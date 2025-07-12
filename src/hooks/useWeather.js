'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { DEFAULT_CITY, OPENWEATHER_BASE_URL, OPENWEATHER_API_KEY } from '@/utils/constants';

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const buildWeatherUrl = (query) =>
    `${OPENWEATHER_BASE_URL}/weather?${query}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  const parseWeatherData = (data) => ({
    temp: data.main.temp,
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    city: data.name,
    icon: data.weather[0].icon,
  });

  const fetchWeatherByCity = async (city) => {
    const url = buildWeatherUrl(`q=${city}`);
    const { data } = await axios.get(url);
    return parseWeatherData(data);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    const url = buildWeatherUrl(`lat=${lat}&lon=${lon}`);
    const { data } = await axios.get(url);
    return parseWeatherData(data);
  };

  const fetchFallbackWeather = async () => {
    try {
      const fallbackWeather = await fetchWeatherByCity(DEFAULT_CITY);
      setWeather(fallbackWeather);
      setCityName(fallbackWeather.city);
    } catch (err) {
      console.error('Fallback weather fetch failed:', err);
    }
  };

  const handleSearch = async (city) => {
    try {
      const searchedWeather = await fetchWeatherByCity(city);
      setWeather(searchedWeather);
      setCityName(searchedWeather.city);
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
          try {
            const locationWeather = await fetchWeatherByCoords(latitude, longitude);
            setWeather(locationWeather);
            setCityName(locationWeather.city);
          } catch (err) {
            console.warn('Geolocation fetch failed, using fallback:', err);
            fetchFallbackWeather();
          }
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
