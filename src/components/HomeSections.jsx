import React, { useRef, useState, useEffect } from 'react';
import { AIRPORTS } from '../data/flights';
import { PARTNERS } from '../data/partners';
import { DEALS } from '../data/deals';
import { styles } from './shared/styles';

export const HomeSections = ({ setTo, scrollToDatVe }) => {
  const sliderRef = useRef(null);
  const [cityPage, setCityPage] = useState(0);
  const [cityPages, setCityPages] = useState(1);

  useEffect(() => {
    const calc = () => {
      const el = sliderRef.current;
      if (!el) return;
      const cw = el.clientWidth || 1;
      const visible = Math.max(1, Math.floor(cw / 180));
      setCityPages(Math.max(1, Math.ceil(AIRPORTS.length / visible)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const scrollCity = (dir = 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  const handleCityScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setCityPage(page);
  };

  return (
    <div>
      {/* City slider */}
      <section style={{ padding: '24px 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h3 style={{ marginBottom: 6, fontSize: 20, fontWeight: 700 }}>Khám phá các thành phố</h3>
          <div style={{ height: 6, width: 72, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', borderRadius: 6, marginBottom: 12 }} />
          <div style={{ position: 'relative' }}>
            <button aria-label="Prev" onClick={() => scrollCity(-1)} className="slider-arrow" style={{ position: 'absolute', left: -14, top: '40%', zIndex: 30, border: 'none', background: 'var(--panel-bg)', boxShadow: '0 8px 20px rgba(2,6,23,0.12)', cursor: 'pointer' }}>‹</button>
            <div ref={sliderRef} onScroll={handleCityScroll} className="snap-container" style={{ display: 'flex', gap: 12, paddingBottom: 6 }} tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowLeft') { scrollCity(-1); } if (e.key === 'ArrowRight') { scrollCity(1); } }} aria-label="City slider">
              {AIRPORTS.map((a) => (
                <div key={a.code} className="card-hover" style={{ minWidth: 180, height: 130, borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: '0 8px 24px rgba(2,6,23,0.12)' }} onClick={() => { setTo(a.code); scrollToDatVe(); }}>
                  <img src={`https://picsum.photos/seed/${a.code}/360/260`} alt={a.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', left: 12, bottom: 12, color: '#fff', fontWeight: 800, textShadow: '0 6px 18px rgba(0,0,0,0.45)', fontSize: 15 }}>{a.city}</div>
                </div>
              ))}
            </div>
            <button aria-label="Next" onClick={() => scrollCity(1)} className="slider-arrow" style={{ position: 'absolute', right: -14, top: '40%', zIndex: 30, border: 'none', background: 'var(--panel-bg)', boxShadow: '0 8px 20px rgba(2,6,23,0.12)', cursor: 'pointer' }}>›</button>

            <div role="tablist" aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: 10, gap: 6 }}>
              {Array.from({ length: cityPages }).map((_, i) => (
                <button key={i} aria-label={`Go to page ${i + 1}`} aria-selected={i === cityPage} onClick={() => { const el = sliderRef.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' }); }} style={{ width: 8, height: 8, borderRadius: 999, background: i === cityPage ? 'var(--accent)' : 'rgba(0,0,0,0.12)', cursor: 'pointer', border: 'none', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners strip */}
      <section style={{ padding: '18px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div className="snap-container" style={{ overflowX: 'auto', display: 'flex', gap: 12, padding: '8px 0' }}>
            {PARTNERS.map((p) => (
              <div key={p} style={{ minWidth: 140, padding: '10px 16px', borderRadius: 999, background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="gioi-thieu" style={{ padding: '28px 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h3 style={{ marginBottom: 12 }}>Vì sao chọn SkyHop</h3>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Đặt vé nhanh chóng</div>
              <div style={{ color: 'var(--text-muted)' }}>Giao diện đơn giản, tìm và đặt trong vài bước.</div>
            </div>
            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Giá tốt nhất</div>
              <div style={{ color: 'var(--text-muted)' }}>So sánh nhanh và chọn giá phù hợp với bạn.</div>
            </div>
            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Hỗ trợ 24/7</div>
              <div style={{ color: 'var(--text-muted)' }}>Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals */}
      <section style={{ padding: '24px 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h3 style={{ marginBottom: 6, fontSize: 20, fontWeight: 700 }}>Chuyến bay ưu đãi</h3>
          <div style={{ height: 6, width: 72, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', borderRadius: 6, marginBottom: 12 }} />
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {DEALS.map((d) => (
              <div key={d.id} className="card-hover" style={{ padding: 12, borderRadius: 12, background: 'var(--panel-bg)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700 }}>{d.from} → {d.to}</div>
                  <div style={{ background: 'var(--accent)', color: 'var(--text-on-accent)', padding: '4px 8px', borderRadius: 8 }}>-{d.discount}%</div>
                </div>
                <div style={{ marginTop: 8, color: 'var(--text-muted)' }}>{d.date}</div>
                <div style={{ marginTop: 12, fontWeight: 800, fontSize: 18.5 }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.price)}</div>
                <div style={{ marginTop: 12 }}>
                  <button className="sb-btn" style={styles.selectBtn} onClick={() => { setTo(d.to); scrollToDatVe(); }}>Đặt ngay</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top destinations */}
      <section style={{ padding: '28px 0' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h3 style={{ marginBottom: 6, fontSize: 20, fontWeight: 700 }}>Nơi nên đi</h3>
          <div style={{ height: 6, width: 72, background: 'linear-gradient(90deg,var(--accent),var(--accent-2))', borderRadius: 6, marginBottom: 12 }} />
          <div className="snap-container" style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {AIRPORTS.map((a) => (
              <div key={a.code} style={{ width: 120, textAlign: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: 999, overflow: 'hidden', margin: '0 auto' }}>
                  <img src={`https://picsum.photos/seed/dest-${a.code}/200/200`} alt={a.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>{a.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSections;
