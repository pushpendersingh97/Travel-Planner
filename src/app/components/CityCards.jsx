'use client';
import { motion } from 'framer-motion';
import usePlaces from '@/hooks/usePlaces';

export default function CityCards({ city }) {
  const { places, loading } = usePlaces(decodeURIComponent(city).split(',')[0]);

  if (loading) {
    return (
      <div className="px-4 py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <img src={place.image} alt={place.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{place.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{place.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
