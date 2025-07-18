'use client';
import { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

export function MyProvider({ children }) {
  const [cities, setCities] = useState([]);

  return <GlobalContext.Provider value={{ cities, setCities }}>{children}</GlobalContext.Provider>;
}
