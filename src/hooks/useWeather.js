'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DEFAULT_CITY, OPENWEATHER_BASE_URL, OPENWEATHER_API_KEY } from '@/utils/constants';

export default function useWeather({ city = '' } = {}) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  const buildUrl = (endpoint, query) =>
    `${OPENWEATHER_BASE_URL}/${endpoint}?${query}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  const parseWeather = (data) => ({
    temp: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed),
    city: data.name,
    icon: data.weather[0].icon,
  });

  const parseForecast = (data) => {
    const grouped = {};

    data.list.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(entry);
    });

    return Object.keys(grouped)
      .slice(0, 5)
      .map((date) => {
        const entries = grouped[date];
        const temps = entries.map((e) => e.main.temp);
        const icons = entries.map((e) => e.weather[0].icon);
        return {
          day: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }),
          max: Math.round(Math.max(...temps)),
          min: Math.round(Math.min(...temps)),
          icon: icons[Math.floor(icons.length / 2)],
        };
      });
  };

  const fetchWeather = async (query) => {
    const { data } = await axios.get(buildUrl('weather', query));
    return parseWeather(data);
  };

  const fetchForecast = async (query) => {
    const { data } = await axios.get(buildUrl('forecast', query));
    return parseForecast(data);
  };

  const fetchWeatherByCity = async (city) => fetchWeather(`q=${city}`);
  const fetchForecastByCity = async (city) => fetchForecast(`q=${city}`);

  const fetchAllWeatherData = async (cityQuery) => {
    setLoading(true);
    try {
      const [current, forecastData] = await Promise.all([
        fetchWeatherByCity(cityQuery),
        fetchForecastByCity(cityQuery),
      ]);
      setWeather(current);
      setForecast(forecastData);
      setCityName(current.city);
      setHasSearched(true);
    } catch (err) {
      toast.error('City not found or API error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFallbackWeather = async () => {
    try {
      const [fallbackWeather, fallbackForecast] = await Promise.all([
        fetchWeatherByCity(DEFAULT_CITY),
        fetchForecastByCity(DEFAULT_CITY),
      ]);
      setWeather(fallbackWeather);
      setForecast(fallbackForecast);
      setCityName(fallbackWeather.city);
    } catch (err) {
      toast.error('Fallback weather fetch failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (cityQuery) => {
    if (!cityQuery) return;
    await fetchAllWeatherData(cityQuery);
  };

  useEffect(() => {
    if (city) {
      fetchAllWeatherData(city);
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const [locWeather, locForecast] = await Promise.all([
              fetchWeather(`lat=${coords.latitude}&lon=${coords.longitude}`),
              fetchForecast(`lat=${coords.latitude}&lon=${coords.longitude}`),
            ]);
            setWeather(locWeather);
            setForecast(locForecast);
            setCityName(locWeather.city);
          } catch (err) {
            console.warn('Geo fetch failed, falling back to default');
            await fetchFallbackWeather();
          } finally {
            setLoading(false);
          }
        },
        async () => {
          console.warn('Geolocation denied, using fallback');
          await fetchFallbackWeather();
        },
        { timeout: 10000 }
      );
    } else {
      fetchFallbackWeather();
    }
  }, [city]);

  return {
    weather,
    forecast,
    cityName,
    hasSearched,
    loading,
    handleSearch,
  };
}
