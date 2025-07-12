'use client';

import { useParams } from 'next/navigation';
import useWeather from '@/hooks/useWeather';
import Header from '@/app/components/Header';
import CityCards from '@/app/components/CityCards';
import CurrentWeatherCard from '@/app/components/CurrentWeatherCard';
import ForecastWidget from '@/app/components/ForecastWidget';

export default function CityPage() {
  const { cityName } = useParams();
  const { weather, forecast, loading, handleSearch } = useWeather({ city: cityName });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header cityName={cityName} showSearchInHeader={true} onSearch={handleSearch} />

      <div className="flex flex-col md:flex-row">
        <main className="flex-1">
          <CityCards city={cityName} />
        </main>

        <div className="md:w-80 w-full p-2">
          <CurrentWeatherCard weather={weather} loading={loading} />
          <ForecastWidget forecast={forecast} loading={loading} />
        </div>
      </div>
    </div>
  );
}
