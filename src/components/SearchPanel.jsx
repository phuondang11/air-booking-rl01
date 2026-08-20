import React from "react";
import { MapPin, ArrowRightLeft, Calendar, Users } from "lucide-react";
import { styles } from "./shared/styles";
import { AIRPORTS } from "../data/flights";

export const SearchPanel = ({
  from, setFrom,
  to, setTo,
  date, setDate,
  pax, setPax,
  swap, search
}) => {
  return (
    <div style={styles.hero}>
      <div style={styles.heroText}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#FFB020", fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
          CHUYẾN BAY SÁNG NAY
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
          Đặt vé nhẹ nhàng,<br />bay đúng giờ.
        </h1>
      </div>

      <div style={styles.panel}>
        <div style={styles.fieldRow}>
          <div style={styles.field}>
            <label style={styles.label}><MapPin size={12} /> Điểm đi</label>
            <select className="sb-select" value={from} onChange={(e) => setFrom(e.target.value)} style={styles.select}>
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code} style={{ color: "#0A0F1C" }}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          <button onClick={swap} className="sb-btn" style={styles.swapBtn} aria-label="Đổi chiều">
            <ArrowRightLeft size={16} color="#0A0F1C" />
          </button>

          <div style={styles.field}>
            <label style={styles.label}><MapPin size={12} /> Điểm đến</label>
            <select className="sb-select" value={to} onChange={(e) => setTo(e.target.value)} style={styles.select}>
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code} style={{ color: "#0A0F1C" }}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.fieldRow}>
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

        <button 
          onClick={search} 
          disabled={from === to} 
          className="sb-btn" 
          style={{ ...styles.primaryBtn, opacity: from === to ? 0.5 : 1 }}
        >
          Tìm chuyến bay
        </button>
        {from === to && <div style={{ fontSize: 12, color: "#FF8A8A", marginTop: 8 }}>Điểm đi và điểm đến phải khác nhau nha.</div>}
      </div>
    </div>
  );
};
