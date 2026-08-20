import React from "react";
import { styles } from "./shared/styles";
import { formatVND, SEAT_ROWS, SEAT_COLS } from "../data/flights";

export const SeatMap = ({ flight, pax, seats, takenSeats, toggleSeat, confirmBooking }) => {
  if (!flight) return null;

  return (
    <div style={styles.section} className="sb-section">
      <div style={styles.boardHeader}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            {flight.code} · {flight.dep}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
            Chọn {pax} chỗ ngồi
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{seats.length}/{pax} đã chọn</div>
      </div>

      <div style={{ ...styles.seatPanel, maxWidth: 760, margin: '0 auto' }} className="sb-seat-panel">
        <div style={{ ...styles.planeNose, fontWeight: 700 }}>MŨI MÁY BAY</div>
        {Array.from({ length: SEAT_ROWS }).map((_, ri) => {
          const r = ri + 1;
          return (
            <div key={r} style={styles.seatRow}>
              <span style={styles.seatRowNum}>{r}</span>
              {SEAT_COLS.map((c, ci) => {
                const id = `${r}${c}`;
                const taken = takenSeats.has(id);
                const selected = seats.includes(id);
                return (
                  <React.Fragment key={id}>
                    <button
                      disabled={taken}
                      onClick={() => toggleSeat(id)}
                      className="sb-seat"
                      style={{
                        ...styles.seat,
                        background: taken ? "var(--seat-taken)" : selected ? "var(--accent)" : "var(--seat-available)",
                        borderColor: taken ? "var(--seat-taken)" : selected ? "var(--accent)" : "var(--panel-overlay)",
                        color: taken ? "var(--text-muted)" : selected ? "var(--text-on-accent)" : "var(--text-primary)",
                        cursor: taken ? "not-allowed" : "pointer",
                      }}
                    >
                      {c}
                    </button>
                    {ci === 2 && <span style={{ width: 18 }} />}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
        <div style={styles.legend}>
          <span style={styles.legendItem}>
            <i style={{ ...styles.legendDot, background: "var(--seat-available)", borderColor: "var(--panel-overlay)" }} /> Còn trống
          </span>
          <span style={styles.legendItem}>
            <i style={{ ...styles.legendDot, background: "var(--accent)", borderColor: "var(--accent)" }} /> Đang chọn
          </span>
          <span style={styles.legendItem}>
            <i style={{ ...styles.legendDot, background: "var(--seat-taken)", borderColor: "var(--seat-taken)" }} /> Đã có người
          </span>
        </div>
      </div>

      <div style={styles.summaryBar} className="sb-summary-bar">
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Tạm tính</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: "var(--accent)" }}>
            {formatVND(flight.price * pax)}
          </div>
        </div>
        <button
          onClick={confirmBooking}
          disabled={seats.length !== pax}
          className="sb-btn"
          style={{ ...styles.primaryBtn, width: 200, opacity: seats.length !== pax ? 0.5 : 1 }}
        >
          Xác nhận đặt vé
        </button>
      </div>
    </div>
  );
};
