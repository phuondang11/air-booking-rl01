import React from "react";
import { styles } from "./shared/styles";
import { FlightRow } from "./FlightRow";

export const FlightBoard = ({ date, from, to, pax, flights, pickFlight, cityOf }) => {
  return (
    <div style={styles.section}>
      <div style={styles.boardHeader}>
        <div>
          <div style={{ ...styles.monoMutedText, fontSize: 12 }}>{date}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
            {cityOf(from)} → {cityOf(to)}
          </div>
        </div>
        <div style={{ ...styles.monoMutedText, fontSize: 12 }}>{pax} hành khách</div>
      </div>

      <div className="sb-board-scroll">
        <div className="sb-board-inner" style={styles.board}>
          <div style={styles.boardColHeader}>
            <span style={{ width: 90 }}>CHUYẾN</span>
            <span style={{ width: 130 }}>GIỜ BAY</span>
            <span style={{ flex: 1 }}>HÃNG</span>
            <span style={{ width: 60 }}>CỔNG</span>
            <span style={{ width: 90, textAlign: "right" }}>GIÁ VÉ</span>
            <span style={{ width: 90 }} />
          </div>
          {flights.map((f) => (
            <FlightRow key={f.id} flight={f} pickFlight={pickFlight} />
          ))}
          {flights.length === 0 && (
            <div style={{ ...styles.mutedText, padding: 30, textAlign: "center" }}>
              Không có chuyến phù hợp, thử lại nhé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
