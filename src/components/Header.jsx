import React, { useEffect, useState } from "react";
import { Plane, ChevronLeft, Clock, Sun, Moon, CloudSun, Menu } from "lucide-react";
import { styles } from "./shared/styles";
import { useWeather } from "../hooks/useWeather";

export const Header = ({ screen, backToResults, reset, setScreen, theme, toggleTheme, from, cityOf }) => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const handleBack = () => {
    if (screen === "ticket" || screen === "seats") {
      backToResults();
      return;
    }
    reset();
  };

  const bucketForHour = (h) => {
    if (h >= 5 && h <= 10) return "morning";
    if (h >= 11 && h <= 17) return "afternoon";
    return "evening";
  };

  const h = time.getHours();
  const bucket = bucketForHour(h);
  const GreetingIcon = bucket === "morning" ? Sun : bucket === "afternoon" ? CloudSun : Moon;
  const greetingText = bucket === "morning" ? "Chào buổi sáng" : bucket === "afternoon" ? "Chào buổi chiều" : "Chào buổi tối";

  const { temp, weatherCode, loading, error } = useWeather(from);
  const clock = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Home screen header (expanded)
  if (screen === 'search') {
    return (
      <div style={{ ...styles.header, alignItems: 'center', gap: 12 }} className="sb-header" id="home-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <Plane size={16} color="var(--text-on-accent)" style={{ transform: "rotate(45deg)" }} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>
              SkyHop
            </span>
          </div>

          <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="sb-btn" onClick={() => scrollTo('home-top')} style={{ ...styles.ghostBtn, color: 'var(--accent)', fontWeight: 700 }}>Trang chủ</button>
            <button className="sb-btn" onClick={() => scrollTo('gioi-thieu')} style={styles.ghostBtn}>Giới thiệu</button>
            <button className="sb-btn" onClick={() => scrollTo('dat-ve')} style={styles.ghostBtn}>Đặt vé</button>
          </nav>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 10px', borderRadius: 12, background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
            <GreetingIcon size={16} color="var(--accent)" />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{greetingText}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>{clock}</span>
                <span>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {/* weather icon + temp */}
                    <span style={{ fontSize: 12 }}>
                      {loading ? '--°' : (typeof temp === 'number' ? `${Math.round(temp)}°` : '--°')}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cityOf(from)}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {toggleTheme && (
            <button onClick={toggleTheme} className="sb-btn" style={{ border: '1px solid var(--accent)', padding: 8, borderRadius: 999, background: 'transparent' }} aria-label="Chuyển theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default compact header for other screens
  return (
    <div style={styles.header} className="sb-header">
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <Plane size={16} color="var(--text-on-accent)" style={{ transform: "rotate(45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>
          SkyHop
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setScreen && setScreen('history')} className="sb-btn" style={styles.ghostBtn} aria-label="Lịch sử">
          <Clock size={16} />
        </button>

        {screen !== "search" && (
          <button onClick={handleBack} className="sb-btn" style={styles.ghostBtn}>
            <ChevronLeft size={15} /> Tìm chuyến khác
          </button>
        )}

        {toggleTheme && (
          <button onClick={toggleTheme} className="sb-btn" style={styles.ghostBtn} aria-label="Chuyển theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};
