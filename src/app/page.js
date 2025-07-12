'use client';

import CityCards from './components/CityCards';
import Header from './components/Header';
import Search from './components/Search';

import useWeather from '@/hooks/useWeather';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastWidget from './components/ForecastWidget';

export default function Home() {
  const { weather, forecast, cityName, hasSearched, handleSearch, loading } = useWeather();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header cityName={cityName} showSearchInHeader={hasSearched} onSearch={handleSearch} />

      <div className="flex flex-col md:flex-row">
        <main className="flex-1">
          {!hasSearched && (
            <div className="flex flex-col items-center justify-start px-4 py-10 md:py-4">
              <Search onSearch={handleSearch} isInline={false} />
            </div>
          )}
          {hasSearched && <CityCards city={cityName} />}
        </main>

        {/* Sidebar with Current Weather + Forecast */}
        <div className="md:w-80 w-full p-2">
          <CurrentWeatherCard weather={weather} loading={loading} />
          <ForecastWidget forecast={forecast} loading={loading} />
        </div>
      </div>
    </div>
  );
}
