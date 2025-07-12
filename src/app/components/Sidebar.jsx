'use client';

import { motion } from 'framer-motion';

export default function Sidebar({ weather }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon || '10d'}@2x.png`;
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative md:w-72 w-full p-4 m-4 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-800 dark:to-indigo-900 text-white shadow-xl overflow-hidden h-full"
    >
      <div className="flex justify-between items-center mb-2 relative z-10">
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <h2 className="font-semibold text-lg">{weather.city}</h2>
        </div>
        {/* <div className="bg-yellow-300 rounded-full w-6 h-6 shadow-sm"></div> */}
      </div>

      <div className="flex justify-center mb-2 relative z-10">
        <img src={iconUrl} alt={weather.condition} className="w-20 h-20 drop-shadow-md" />
      </div>

      <div className="text-center mb-2 relative z-10">
        <p className="text-sm opacity-90">{date}</p>
        <p className="text-5xl font-bold">{weather.temp}°</p>
        <p className="text-md capitalize">{weather.condition}</p>
      </div>

      <div className="flex justify-around text-sm mt-4 relative z-10">
        <div className="flex flex-col items-center">
          <span className="text-xl">💨</span>
          <p className="font-medium">Wind</p>
          <p>{weather.wind} km/h</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">💧</span>
          <p className="font-medium">Hum</p>
          <p>{weather.humidity}%</p>
        </div>
      </div>
    </motion.aside>
  );
}
