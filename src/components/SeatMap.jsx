import React from "react";
import { styles } from "./shared/styles";
import { formatVND, SEAT_ROWS, SEAT_COLS } from "../data/flights";

export const SeatMap = ({ flight, pax, seats, takenSeats, toggleSeat, confirmBooking }) => {
  if (!flight) return null;

  return (
    <div style={styles.section}>
      <div style={styles.boardHeader}>
        <div>
          <div style={{ fontSize: 12, color: "#8891A6", fontFamily: "'JetBrains Mono', monospace" }}>
            {flight.code} · {flight.dep}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
            Chọn {pax} chỗ ngồi
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#8891A6" }}>{seats.length}/{pax} đã chọn</div>
      </div>

      <div style={styles.seatPanel}>
        <div style={styles.planeNose}>MŨI MÁY BAY</div>
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
                        background: taken ? "#232B3D" : selected ? "#FFB020" : "#121A2E",
                        borderColor: taken ? "#232B3D" : selected ? "#FFB020" : "rgba(255,255,255,0.12)",
                        color: taken ? "#3E4964" : selected ? "#0A0F1C" : "#E7ECF5",
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
            <i style={{ ...styles.legendDot, background: "#121A2E", borderColor: "rgba(255,255,255,0.12)" }} /> Còn trống
          </span>
          <span style={styles.legendItem}>
            <i style={{ ...styles.legendDot, background: "#FFB020", borderColor: "#FFB020" }} /> Đang chọn
          </span>
          <span style={styles.legendItem}>
            <i style={{ ...styles.legendDot, background: "#232B3D", borderColor: "#232B3D" }} /> Đã có người
          </span>
        </div>
      </div>

      <div style={styles.summaryBar}>
        <div>
          <div style={{ fontSize: 12, color: "#8891A6" }}>Tạm tính</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: "#FFB020" }}>
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
