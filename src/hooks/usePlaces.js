'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SEARCH_URL = 'https://places-api.foursquare.com/places/search';
const PHOTO_URL = (fsq_id) => `https://places-api.foursquare.com/places/${fsq_id}/photos`;
const API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'X-Places-Api-Version': '2025-06-17',
};

export default function usePlaces(city) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        // 1. Search for places
        const res = await axios.get(SEARCH_URL, {
          headers: HEADERS,
          params: {
            query: 'tourist attractions',
            near: city,
            limit: 10,
          },
        });

        const results = res.data.results;

        // 2. For each place, try fetching photo; fallback to category icon
        const enrichedPlaces = await Promise.all(
          results.map(async (place) => {
            const fsqId = place.fsq_place_id;
            let imageUrl = '';

            // Try to get photo
            try {
              const photoRes = await axios.get(PHOTO_URL(fsqId), {
                headers: HEADERS,
                params: { limit: 1 },
              });

              if (photoRes.data.length > 0) {
                const photo = photoRes.data[0];
                imageUrl = `${photo.prefix}original${photo.suffix}`;
              }
            } catch (e) {
              console.error(`Failed to fetch photo for ${fsqId}:`, e);
            }

            // If no photo found, use category icon
            if (!imageUrl && place.categories?.[0]?.icon) {
              const { prefix, suffix } = place.categories[0].icon;
              imageUrl = `${prefix}bg_120${suffix}`;
            }

            return {
              id: fsqId,
              name: place.name,
              description: place.categories?.[0]?.name || 'Popular Destination',
              image: imageUrl || '/images/default.jpg',
            };
          })
        );

        setPlaces(enrichedPlaces);
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
