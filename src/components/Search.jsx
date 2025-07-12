"use client";

import { useState, useEffect } from "react";

const mockCities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Berlin",
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = mockCities.filter((city) =>
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
    <div className="w-full flex justify-center items-center h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-950 px-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showDropdown && (
          <ul
            className={`absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow z-10 max-h-60 overflow-y-auto transition-all duration-200 transform ${
              showDropdown
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {results.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer text-gray-800 dark:text-white"
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
