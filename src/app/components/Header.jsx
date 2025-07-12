'use client';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import { Plane } from 'lucide-react';

export default function Header({ cityName, showSearchInHeader, onSearch }) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
        <Plane className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        {cityName || 'Travel Planner'}
      </div>
      {showSearchInHeader && (
        <div className="w-full md:w-1/2">
          <Search onSearch={onSearch} isInline={true} />
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
