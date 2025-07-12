'use client';

export default function Sidebar({ weather }) {
  if (!weather) return null;

  return (
    <aside className="md:w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 m-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">Weather Info</h2>
      <p>
        <strong>Temp:</strong> {weather.temp}°C
      </p>
      <p>
        <strong>Condition:</strong> {weather.condition}
      </p>
      <p>
        <strong>Humidity:</strong> {weather.humidity}%
      </p>
      <p>
        <strong>Wind:</strong> {weather.wind} km/h
      </p>
    </aside>
  );
}
