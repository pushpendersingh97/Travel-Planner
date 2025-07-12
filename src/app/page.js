'use client';

import CityCards from './components/CityCards';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import useWeather from '@/hooks/useWeather';

export default function Home() {
  const { weather, cityName, hasSearched, handleSearch } = useWeather();

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
        <Sidebar weather={weather} />
      </div>
    </div>
  );
}
