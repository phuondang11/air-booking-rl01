import { useEffect, useState } from "react";
import { AIRPORTS } from "../data/flights";

const cache = new Map();

export const useWeather = (airportCode) => {
  const [weather, setWeather] = useState({
    temp: null,
    weatherCode: null,
    loading: Boolean(airportCode),
    error: null,
  });

  useEffect(() => {
    if (!airportCode) {
      setWeather({ temp: null, weatherCode: null, loading: false, error: null });
      return undefined;
    }

    const airport = AIRPORTS.find((a) => a.code === airportCode);
    if (!airport || airport.lat == null || airport.lon == null) {
      setWeather({ temp: null, weatherCode: null, loading: false, error: "missing-location" });
      return undefined;
    }

    if (cache.has(airportCode)) {
      setWeather(cache.get(airportCode));
      return undefined;
    }

    let isActive = true;
    setWeather({ temp: null, weatherCode: null, loading: true, error: null });

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${airport.lat}&longitude=${airport.lon}&current_weather=true`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("weather-fetch-failed");
        }
        return res.json();
      })
      .then((data) => {
        const result = {
          temp: data?.current_weather?.temperature ?? null,
          weatherCode: data?.current_weather?.weathercode ?? null,
          loading: false,
          error: null,
        };

        if (isActive) {
          cache.set(airportCode, result);
          setWeather(result);
        }
      })
      .catch(() => {
        const result = {
          temp: null,
          weatherCode: null,
          loading: false,
          error: "fetch-error",
        };

        if (isActive) {
          cache.set(airportCode, result);
          setWeather(result);
        }
      });

    return () => {
      isActive = false;
    };
  }, [airportCode]);

  return weather;
};
