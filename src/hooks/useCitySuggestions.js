'use client';

import { useState, useMemo } from 'react';
import axios from 'axios';
import { OPENWEATHER_API_KEY } from '@/utils/constants';
import { debounce } from '@/utils/debounce';
import toast from 'react-hot-toast';

const useCitySuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );
      const cities = response.data.map((item) => {
        const location = `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`;
        return location;
      });
      setSuggestions(cities);
    } catch (err) {
      toast.error('Failed to fetch city suggestions');
      setSuggestions([]);
    }
  };

  const fetchSuggestions = useMemo(() => debounce(fetchCities, 300), []);

  return { suggestions, fetchSuggestions };
};

export default useCitySuggestions;
