import React from "react";
import { styles } from "./shared/styles";
import { formatVND } from "../data/flights";

export const FlightRow = ({ flight, pickFlight }) => {
  return (
    <div className="sb-row" style={styles.row}>
      <span style={{ ...styles.accentMonoText, width: 90, fontWeight: 700 }}>
        {flight.code}
      </span>
      <span style={{ ...styles.monoText, width: 130 }}>
        {flight.dep} <span style={styles.mutedText}>→</span> {flight.arr}
      </span>
      <span style={{ flex: 1, fontSize: 14 }}>{flight.airline}</span>
      <span style={{ ...styles.monoMutedText, width: 60 }}>{flight.gate}</span>
      <span style={styles.tablePriceWrap}>
        <span style={{ ...styles.monoText, width: 90, textAlign: "right", fontWeight: 600 }}>
          {formatVND(flight.price)}
        </span>
        <span style={styles.seatsBadge}>Còn {flight.seatsLeft} chỗ</span>
      </span>
      <span style={{ width: 90, display: "flex", justifyContent: "flex-end" }}>
        <button className="sb-btn" style={styles.selectBtn} onClick={() => pickFlight(flight)}>
          Chọn
        </button>
      </span>
    </div>
  );
};
