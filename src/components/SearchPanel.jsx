import React from "react";
import {
  MapPin,
  ArrowRightLeft,
  Calendar,
  Users,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { styles } from "./shared/styles";
import { AIRPORTS } from "../data/flights";
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

const WeatherPill = ({ code }) => {
  const { temp, weatherCode, loading, error } = useWeather(code);
  const Icon = getWeatherIcon(weatherCode);
  const displayTemp = typeof temp === "number" ? `${Math.round(temp)}°` : "--°";

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginTop: 6,
      padding: "4px 8px",
      borderRadius: 999,
      background: "rgba(136,145,166,0.06)",
      color: "var(--text-muted)",
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      lineHeight: 1,
      border: "1px solid var(--border)",
    }}>
      <Icon size={14} color={loading || error ? "var(--text-muted)" : "var(--accent)"} />
      <span>{loading ? "--°" : displayTemp}</span>
    </span>
  );
};

export const SearchPanel = ({
  from, setFrom,
  to, setTo,
  date, setDate,
  pax, setPax,
  swap, search
}) => {
  return (
    <div id="dat-ve" style={{ ...styles.hero, paddingTop: 0, marginTop: -56 }} className="sb-hero">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, maxWidth: 980, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
            CHUYẾN BAY SÁNG NAY
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 48, fontWeight: 700, margin: 0, lineHeight: 1.05 }}>
            Đặt vé nhẹ nhàng,<br />bay đúng giờ.
          </h1>
        </div>

        <div className="search-right" style={{ width: '44%', minWidth: 360 }}>
          <div style={{ ...styles.panel, transform: 'translateY(-48px)', position: 'relative', zIndex: 40 }} className="section-animate" data-idx="0">
            <div style={styles.fieldRow} className="sb-field-row">
              <div style={styles.field}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <label style={styles.label}><MapPin size={12} /> Điểm đi</label>
                  <WeatherPill code={from} />
                </div>
                <select className="sb-select" value={from} onChange={(e) => setFrom(e.target.value)} style={styles.select}>
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code} style={{ color: "var(--text-primary)" }}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>

              <button onClick={swap} className="sb-btn sb-swap-btn" style={styles.swapBtn} aria-label="Đổi chiều">
                <ArrowRightLeft size={16} color="var(--text-primary)" />
              </button>

              <div style={styles.field}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <label style={styles.label}><MapPin size={12} /> Điểm đến</label>
                  <WeatherPill code={to} />
                </div>
                <select className="sb-select" value={to} onChange={(e) => setTo(e.target.value)} style={styles.select}>
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code} style={{ color: "var(--text-primary)" }}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.fieldRow} className="sb-field-row">
              <div style={styles.field}>
                <label style={styles.label}><Calendar size={12} /> Ngày bay</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.select} />
              </div>

              <div style={{ width: 16 }} />

              <div style={styles.field}>
                <label style={styles.label}><Users size={12} /> Hành khách</label>
                <div style={styles.stepper}>
                  <button className="sb-btn" style={styles.stepBtn} onClick={() => setPax((p) => Math.max(1, p - 1))}>−</button>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, width: 24, textAlign: "center" }}>{pax}</span>
                  <button className="sb-btn" style={styles.stepBtn} onClick={() => setPax((p) => Math.min(6, p + 1))}>+</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={search}
                disabled={from === to}
                className="sb-btn primary-hover"
                style={{ ...styles.primaryBtn, opacity: from === to ? 0.5 : 1 }}
              >
                Tìm chuyến bay
              </button>
              {from === to && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 8 }}>Điểm đi và điểm đến phải khác nhau nha.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
