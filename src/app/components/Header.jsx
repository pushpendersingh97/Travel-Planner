'use client';
import { useContext, useState } from 'react';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import { Plane } from 'lucide-react';
import { GlobalContext } from '../provider/MyProvider';

export default function Header({ cityName, showSearchInHeader, onSearch }) {
  const { cities, setCities } = useContext(GlobalContext);
  const [showSaveButton, setShowSaveButton] = useState(true);

  const decodedCityName = decodeURIComponent(cityName);

  // if (cities.includes(decodedCityName)) {
  //   // debugger;
  //   setShowSaveButton((prev) => !prev);
  // }

  const handleSaveCities = () => {
    setCities((prev) => [...prev, decodedCityName]);
    setShowSaveButton(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
        <Plane className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        {cityName ? decodedCityName : 'Travel Planner'}
      </div>

      {/* Conditionally render search bar in header, if we have already searched any city */}
      {showSearchInHeader && (
        <div className="w-full md:w-1/2">
          <Search onSearch={onSearch} isInline={true} />
        </div>
      )}

      {cities && cities.length > 0 && (
        <select className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow z-10 max-h-60 overflow-y-auto transition-all duration-200">
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

      {showSaveButton && !cities.includes(decodedCityName) && <button onClick={handleSaveCities}>Save</button>}

      {/** Theme toggle */}
      <ThemeToggle />
    </header>
  );
}
