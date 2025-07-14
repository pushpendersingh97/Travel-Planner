'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FOURSQUARE_API_URL = 'https://places-api.foursquare.com/places/search';
const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

export default function usePlaces(city) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await axios.get(FOURSQUARE_API_URL, {
          headers: {
            Authorization: `Bearer ${FOURSQUARE_API_KEY}`,
            'X-Places-Api-Version': '2025-06-17',
          },
          params: {
            query: 'tourist attractions',
            near: city,
            limit: 10,
          },
        });

        const data = res.data.results.map((place) => ({
          name: place.name,
          description: place.categories?.[0]?.name || 'Popular destination',
          image: `/images/default.jpg`,
        }));

        setPlaces(data);
      } catch (err) {
        toast.error('Failed to fetch tourist places.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [city]);

  return { places, loading };
}
