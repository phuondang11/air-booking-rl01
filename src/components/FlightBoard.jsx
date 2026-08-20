import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react";
import { styles } from "./shared/styles";
import { FlightRow } from "./FlightRow";
import { useWeather } from "../hooks/useWeather";

const getWeatherIcon = (weatherCode) => {
  if (weatherCode === null || typeof weatherCode === "undefined") return Cloud;
  if (weatherCode === 0) return Sun;
  if (weatherCode >= 1 && weatherCode <= 3) return Cloud;
  if (weatherCode === 45 || weatherCode === 48) return CloudFog;
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) return CloudRain;
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return CloudSnow;
  if (weatherCode >= 95 && weatherCode <= 99) return CloudLightning;
  return Cloud;
};

const WeatherBadge = ({ code }) => {
  const { temp, weatherCode, loading, error } = useWeather(code);
  const Icon = getWeatherIcon(weatherCode);
  const displayTemp = typeof temp === "number" ? `${Math.round(temp)}°` : "--°";

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 8px",
      borderRadius: 999,
      background: "rgba(136,145,166,0.06)",
      color: "var(--text-muted)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      border: "1px solid var(--border)",
    }}>
      <Icon size={14} color={loading || error ? "var(--text-muted)" : "var(--accent)"} />
      <span>{loading ? "--°" : displayTemp}</span>
    </span>
  );
};

export const FlightBoard = ({ date, from, to, pax, flights, pickFlight, cityOf }) => {
  const fromWeather = useWeather(from);
  const toWeather = useWeather(to);

  return (
    <div style={styles.section} className="sb-section sb-container">
      <div style={styles.boardHeader}>
        <div>
          <div style={{ ...styles.monoMutedText, fontSize: 12 }}>{date}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
              {cityOf(from)} → {cityOf(to)}
            </div>
            <WeatherBadge code={from} />
            <WeatherBadge code={to} />
          </div>
        </div>
        <div style={{ ...styles.monoMutedText, fontSize: 12 }}>{pax} hành khách</div>
      </div>

      <div className="sb-board-scroll">
        <div className="sb-board-inner" style={styles.board}>
          <div style={{ ...styles.boardColHeader, borderBottom: 'none', padding: '10px 18px 6px' }} className="sb-board-col-header">
            <span style={{ width: 90, fontSize: 12, color: 'var(--text-muted)' }}>CHUYẾN</span>
            <span style={{ width: 130, fontSize: 12, color: 'var(--text-muted)' }}>GIỜ BAY</span>
            <span style={{ flex: 1, fontSize: 12, color: 'var(--text-muted)' }}>HÃNG</span>
            <span style={{ width: 60, fontSize: 12, color: 'var(--text-muted)' }}>CỔNG</span>
            <span style={{ width: 90, textAlign: "right", fontSize: 12, color: 'var(--text-muted)' }}>GIÁ VÉ</span>
            <span style={{ width: 90 }} />
          </div>
          {flights.map((f) => (
            <FlightRow key={f.id} flight={f} pickFlight={pickFlight} />
          ))}
          {flights.length === 0 && (
            <div style={{ ...styles.mutedText, padding: 30, textAlign: "center" }}>
              Không có chuyến phù hợp, thử lại nhé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
