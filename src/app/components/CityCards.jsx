'use client';
import { motion } from 'framer-motion';

const mockPlaces = [
  { name: 'Central Park', description: 'Famous green space.', image: '/images/park.jpg' },
  { name: 'Historic Museum', description: 'Explore history.', image: '/images/museum.jpg' },
  { name: 'Street Market', description: 'Local foods and crafts.', image: '/images/market.jpg' },
  { name: 'Street Market', description: 'Local foods and crafts.', image: '/images/market.jpg' },
  { name: 'Street Market', description: 'Local foods and crafts.', image: '/images/market.jpg' },
  { name: 'Street Market', description: 'Local foods and crafts.', image: '/images/market.jpg' },
];

export default function CityCards({ city }) {
  return (
    <div className="px-4 py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mockPlaces.map((place, i) => (
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
