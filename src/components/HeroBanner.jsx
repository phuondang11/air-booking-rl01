import React, { useEffect, useState } from 'react';
import { Sun, CloudSun, Moon } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { HERO_BANNERS } from '../data/banners';
import { styles } from './shared/styles';

const bucketForHour = (h) => {
  if (h >= 5 && h <= 10) return 'morning';
  if (h >= 11 && h <= 17) return 'afternoon';
  return 'evening';
};

const getWeatherIcon = (weatherCode) => {
  if (weatherCode === null || typeof weatherCode === 'undefined') return CloudSun;
  if (weatherCode === 0) return Sun;
  if (weatherCode >= 1 && weatherCode <= 3) return CloudSun;
  if (weatherCode === 45 || weatherCode === 48) return CloudSun;
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) return CloudSun;
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return CloudSun;
  if (weatherCode >= 95 && weatherCode <= 99) return CloudSun;
  return CloudSun;
};

export const HeroBanner = ({ from, cityOf }) => {
  const [hour, setHour] = useState(new Date().getHours());
  const [now, setNow] = useState(new Date());
  const bucket = bucketForHour(hour);
  const { temp, weatherCode, loading, error } = useWeather(from);
  const WeatherIcon = getWeatherIcon(weatherCode);

  useEffect(() => {
    const id = setInterval(() => {
      setHour(new Date().getHours());
      setNow(new Date());
    }, 1000 * 60 * 1); // update every minute
    return () => clearInterval(id);
  }, []);

  // banner image fallback logic
  const activeBanner = (HERO_BANNERS && HERO_BANNERS.length > 0) ? HERO_BANNERS[0] : null;

  // For simpler inline styling, compute background style
  const backgroundStyle = activeBanner
    ? { backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.5), rgba(2,6,23,0.18)), url('${activeBanner.url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundImage: `linear-gradient(180deg, rgba(4,6,23,0.5), rgba(4,6,23,0.18)), url('https://picsum.photos/seed/skyhop-banner/1600/900')`, backgroundSize: 'cover', backgroundPosition: 'center' };

  const icon = bucket === 'evening' ? <Moon size={72} /> : bucket === 'morning' ? <Sun size={72} /> : <CloudSun size={72} />;
  const greeting = bucket === 'morning' ? 'Chào buổi sáng' : bucket === 'afternoon' ? 'Chào buổi chiều' : 'Chào buổi tối';

  const clock = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section style={{ height: 'var(--hero-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', ...backgroundStyle }}>
      <div style={{ maxWidth: 1280, width: '100%', color: '#fff' }} className="sb-container">
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, borderRadius: 18, background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', boxShadow: '0 12px 36px rgba(2,6,23,0.12)' }}>{icon}</div>
              <div>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 56, margin: 0, fontWeight: 700, color: 'var(--text-on-accent)', lineHeight: 1.02 }}>{greeting}</h1>
                <div style={{ marginTop: 8, fontSize: 18, color: 'var(--text-on-accent)', opacity: 0.95 }}>Chúc bạn có trải nghiệm thật tốt</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'var(--text-on-accent)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{clock}</div>
                  <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'var(--text-on-accent)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{loading ? '--°' : (typeof temp === 'number' ? `${Math.round(temp)}°` : '--°')}</div>
                  <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'var(--text-on-accent)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{cityOf(from)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
