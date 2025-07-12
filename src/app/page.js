'use client';
import { useEffect, useState } from 'react';
import CityCards from './components/CityCards';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { fetchWeatherData } from '@/utils/weatherService';
import Search from './components/Search';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchFallbackWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather({
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
      });
      setCityName(data.name);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const weatherInfo = await fetchWeatherData(latitude, longitude);
          setWeather(weatherInfo);
          setCityName(weatherInfo.city);
        },
        (err) => {
          console.warn('Geolocation failed, falling back to Delhi:', err.message);
          fetchFallbackWeather();
        },
        { timeout: 10000 } // optional: fail fast
      );
    } else {
      console.warn('Geolocation not available, falling back to Delhi');
      fetchFallbackWeather();
    }
  }, []);

  const handleSearch = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherInfo = {
      temp: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      city: data.name,
    };
    setWeather(weatherInfo);
    setCityName(weatherInfo.city);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header cityName={cityName} showSearchInHeader={hasSearched} onSearch={handleSearch} />

      <div className="flex flex-col md:flex-row">
        <main className="flex-1">
          {/* Case: Before search */}
          {!hasSearched && (
            <div className="flex flex-col items-center justify-start px-4 py-10 md:py-20">
              <Search onSearch={handleSearch} isInline={false} />
            </div>
          )}

          {/* Case: After search */}
          {hasSearched && <CityCards city={cityName} />}
        </main>

        {/* Sidebar: always visible if weather exists */}
        <Sidebar weather={weather} />
      </div>
    </div>
  );
}
