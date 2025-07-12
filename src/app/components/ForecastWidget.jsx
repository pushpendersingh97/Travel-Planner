'use client';

import { motion } from 'framer-motion';

export default function ForecastWidget({ forecast, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-4 m-4 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">5-Day Forecast</h3>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center h-8 bg-gray-300 dark:bg-gray-700 rounded" />
          ))}
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-3"
        >
          {forecast.map((day, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200"
            >
              <span className="w-14">{day.day}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.day}
                className="w-12 h-12 drop-shadow-md"
              />
              <span>
                {day.max}° / {day.min}°
              </span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
