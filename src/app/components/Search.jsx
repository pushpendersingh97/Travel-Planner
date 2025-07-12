'use client';

import { useEffect, useState } from 'react';
import useCitySuggestions from '@/hooks/useCitySuggestions';

export default function Search({ onSearch, isInline = false }) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { suggestions, fetchSuggestions } = useCitySuggestions();

  useEffect(() => {
    if (query.trim()) {
      fetchSuggestions(query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, fetchSuggestions]);

  const handleSelect = (city) => {
    setQuery(city);
    setShowDropdown(false);
    onSearch(city);
  };

  return (
    <div
      className={`relative w-full transition-all duration-500 ease-in-out ${
        isInline ? 'max-w-md' : 'max-w-xl mx-auto'
      }`}
    >
      <input
        type="text"
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        placeholder="Search a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showDropdown && (
        <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow z-10 max-h-60 overflow-y-auto transition-all duration-200">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
