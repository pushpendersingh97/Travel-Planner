'use client';

import { Plane } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
        <Plane className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        Travel Planner
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
