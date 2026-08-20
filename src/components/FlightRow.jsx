import React from "react";
import { styles } from "./shared/styles";
import { formatVND } from "../data/flights";

export const FlightRow = ({ flight, pickFlight }) => {
  return (
    <div className="sb-row sb-flight-row" style={{ ...styles.row, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <div style={{ ...styles.accentMonoText, fontWeight: 700, minWidth: 80 }}>{flight.code}</div>
        <div style={{ ...styles.monoText, minWidth: 120 }}>{flight.dep} <span style={styles.mutedText}>→</span> {flight.arr}</div>
        <div style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)' }}>{flight.airline}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 220, justifyContent: 'flex-end' }}>
        <div style={{ ...styles.monoMutedText, width: 70 }}>Cổng {flight.gate}</div>
        <div style={{ textAlign: 'right', marginRight: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{formatVND(flight.price)}</div>
          <div style={{ marginTop: 6 }}><span style={styles.seatsBadge}>Còn {flight.seatsLeft} chỗ</span></div>
        </div>
        <div style={{ width: 96, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="sb-btn" style={{ ...styles.primaryBtn, width: 88, padding: '8px 10px', borderRadius: 10 }} onClick={() => pickFlight(flight)}>
            Chọn
          </button>
        </div>
      </div>
    </div>
  );
};
