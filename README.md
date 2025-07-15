---

### 📄 `README.md`

````md
# 🌍 Travel Planner App

A sleek, responsive travel planning app built with **Next.js 14**, **Tailwind CSS**, and real-time data from:

- 🌦️ OpenWeather API — current & forecast weather
- 📍 Foursquare API — top tourist attractions
- 🌐 RestCountries API — country-level details (planned)

## ✨ Features

- 🔍 Search any city with intelligent suggestions
- 🧭 View:
  - Current weather
  - 5-day forecast
  - Top 10 famous places to visit
- 🌗 Light/dark theme toggle
- 📱 Fully responsive UI with mobile sidebar collapse
- 🔁 Dynamic routing: `/city/[cityName]`
- ⚡ Debounced city search input
- 🔔 Toast notifications for errors and UX feedback

---

## 🛠️ Tech Stack

| Tech                | Purpose                    |
| ------------------- | -------------------------- |
| **Next.js 14**      | Full-stack React framework |
| **Tailwind CSS**    | Utility-first styling      |
| **Framer Motion**   | UI animations              |
| **Axios**           | Data fetching              |
| **React Hot Toast** | Toast notifications        |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/travel-planner.git
cd travel-planner
```
````

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Setup `.env.local`

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
FOURSQUARE_API_KEY=your_foursquare_api_key
```

### 4. Run Locally

```bash
npm run dev
# or
yarn dev
```

App runs at: `http://localhost:3000`

---

## 🔧 Project Structure

```
/app
  /components
    - Header.jsx
    - Search.jsx
    - CityCards.jsx
    - ForecastWidget.jsx
    - CurrentWeatherCard.jsx
  /city/[cityName]/page.jsx
/hooks
  - useWeather.js
  - usePlaces.js
  - useCitySuggestions.js
/utils
  - debounce.js
  - constants.js
/public
  /images
    - default.jpg
```

---

## 🌐 APIs Used

### 1. OpenWeather

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- Forecast: `https://api.openweathermap.org/data/2.5/forecast`

### 2. Foursquare Places

- Place Search: `https://places-api.foursquare.com/places/search`
- Photos: `https://places-api.foursquare.com/places/{fsq_id}/photos`

### 3. RestCountries API _(optional for future)_

- Country Info: `https://restcountries.com/v3.1/name/{country}`

---

## 💡 Future Enhancements

- 🗺️ Show place map using Mapbox or Google Maps
- 🧾 Add city history and culture from Wikipedia
- ✈️ Travel guides, hotels, and restaurants
- 📍 Save favorite cities and trips

---

## 🙌 Contributing

Feel free to submit pull requests or feature suggestions. This is a learning-focused side project open for collaboration.

---

## 📄 License

[MIT](./LICENSE)

---

## 💬 Acknowledgments

- [OpenWeather](https://openweathermap.org/)
- [Foursquare](https://location.foursquare.com/)
- [RestCountries](https://restcountries.com/)
