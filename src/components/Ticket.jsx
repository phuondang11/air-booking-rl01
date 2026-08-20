import React from "react";
import { Check, Plane, Luggage } from "lucide-react";
import { styles } from "./shared/styles";
import { formatVND } from "../data/flights";

export const Ticket = ({ flight, from, to, date, pax, seats, bookingCode, reset, cityOf }) => {
  if (!flight) return null;

  return (
    <div style={styles.section} className="sb-section sb-container">
      <div className="sb-ticket" style={styles.ticket}>
        <div style={styles.ticketMain}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success)", fontSize: 13, fontWeight: 700, marginBottom: 18 }}>
            <Check size={18} /> Đặt vé thành công
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{cityOf(from)}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700 }}>{from}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>{flight.dep}</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18, color: "var(--text-muted)" }}>
              <div style={{ width: "100%", borderTop: "2px dashed var(--border)", position: "relative" }}>
                <Plane size={16} color="var(--accent)" style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%) rotate(90deg)" }} />
              </div>
              <div style={{ fontSize: 11, marginTop: 6 }}>{flight.duration}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{cityOf(to)}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700 }}>{to}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>{flight.arr}</div>
            </div>
          </div>

          <div style={styles.ticketGrid} className="sb-ticket-grid">
            <div><div style={styles.ticketLabel}>Chuyến bay</div><div style={styles.ticketVal}>{flight.code}</div></div>
            <div><div style={styles.ticketLabel}>Hãng bay</div><div style={styles.ticketVal}>{flight.airline}</div></div>
            <div><div style={styles.ticketLabel}>Ngày bay</div><div style={styles.ticketVal}>{date}</div></div>
            <div><div style={styles.ticketLabel}>Cổng</div><div style={styles.ticketVal}>{flight.gate}</div></div>
            <div><div style={styles.ticketLabel}>Ghế</div><div style={styles.ticketVal}>{seats.slice().sort().join(", ")}</div></div>
            <div><div style={styles.ticketLabel}>Hành lý</div><div style={styles.ticketVal}><Luggage size={13} style={{ marginRight: 4, verticalAlign: -2 }} />20kg</div></div>
          </div>
        </div>

        <div className="sb-ticket-stub" style={styles.ticketStub}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>MÃ ĐẶT CHỖ</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: "var(--accent)", letterSpacing: 2 }}>{bookingCode}</div>
          <div style={{ marginTop: 20, fontSize: 11, color: "var(--text-muted)" }}>TỔNG THANH TOÁN</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700 }}>{formatVND(flight.price * pax)}</div>
        </div>
      </div>

      <button onClick={reset} className="sb-btn" style={{ ...styles.primaryBtn, marginTop: 20, width: 220 }}>
        Đặt thêm chuyến khác
      </button>
    </div>
  );
};
