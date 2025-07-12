'use client';

import { useState, useEffect } from 'react';

const mockCities = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'New York',
  'London',
  'Paris',
  'Tokyo',
  'Berlin'
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = mockCities.filter(city =>
      city.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setShowDropdown(filtered.length > 0);
  }, [query]);

  const handleSelect = (city) => {
    setQuery(city);
    setShowDropdown(false);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showDropdown && (
          <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow z-10 max-h-60 overflow-y-auto">
            {results.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
