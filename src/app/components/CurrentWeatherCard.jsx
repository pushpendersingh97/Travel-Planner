'use client';

import { motion } from 'framer-motion';

export default function CurrentWeatherCard({ weather, loading }) {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (loading || !weather) {
    return (
      <div className="p-4 m-4 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-800 dark:to-indigo-900 animate-pulse h-[260px]">
        <div className="h-6 w-24 bg-white/30 rounded mb-4" />
        <div className="h-20 w-20 bg-white/40 rounded-full mx-auto mb-4" />
        <div className="h-5 w-32 bg-white/30 rounded mx-auto mb-2" />
        <div className="h-6 w-16 bg-white/40 rounded mx-auto mb-2" />
        <div className="h-4 w-20 bg-white/30 rounded mx-auto" />
      </div>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon || '10d'}@2x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 m-4 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-800 dark:to-indigo-900 text-white shadow-xl overflow-hidden"
    >
      <div className="flex justify-between items-center mb-2 relative z-10">
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <h2 className="font-semibold text-lg">{weather.city}</h2>
        </div>
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
    </motion.div>
  );
}
