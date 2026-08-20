import React, { useState, useMemo } from "react";
import { Plane, ArrowRightLeft, Calendar, Users, Clock, MapPin, Check, ChevronLeft, Luggage } from "lucide-react";

const AIRPORTS = [
  { code: "SGN", city: "TP. Hồ Chí Minh" },
  { code: "HAN", city: "Hà Nội" },
  { code: "DAD", city: "Đà Nẵng" },
  { code: "CXR", city: "Nha Trang" },
  { code: "PQC", city: "Phú Quốc" },
  { code: "HUI", city: "Huế" },
];

const AIRLINES = [
  { name: "Vietrix Air", code: "VJ" },
  { name: "Skyline Bamboo", code: "QH" },
  { name: "Delta Wing", code: "VN" },
];

function makeFlights(from, to) {
  if (!from || !to || from === to) return [];
  const seedTimes = [
    ["06:15", "08:05"],
    ["09:40", "11:30"],
    ["13:05", "14:55"],
    ["17:20", "19:15"],
    ["21:00", "22:50"],
  ];
  return seedTimes.map((t, i) => {
    const airline = AIRLINES[i % AIRLINES.length];
    const base = 890000 + i * 165000 + (from.charCodeAt(0) % 5) * 20000;
    return {
      id: `${from}${to}${i}`,
      airline: airline.name,
      code: `${airline.code}${100 + i * 7 + from.charCodeAt(1)}`,
      from,
      to,
      dep: t[0],
      arr: t[1],
      duration: "1h 50p",
      price: base,
      gate: String.fromCharCode(65 + (i % 4)) + (10 + i),
      seatsLeft: [2, 5, 9, 3, 7][i],
    };
  });
}

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

const SEAT_ROWS = 6;
const SEAT_COLS = ["A", "B", "C", "D", "E", "F"];

function buildSeatMap(seed) {
  const taken = new Set();
  let x = seed || 7;
  const rand = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  for (let r = 1; r <= SEAT_ROWS; r++) {
    SEAT_COLS.forEach((c) => {
      if (rand() < 0.28) taken.add(`${r}${c}`);
    });
  }
  return taken;
}

export default function FlightBooking() {
  const [screen, setScreen] = useState("search"); // search | results | seats | ticket
  const [from, setFrom] = useState("SGN");
  const [to, setTo] = useState("DAD");
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [pax, setPax] = useState(1);
  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState([]);
  const [bookingCode, setBookingCode] = useState("");

  const flights = useMemo(() => makeFlights(from, to), [from, to]);
  const takenSeats = useMemo(() => (flight ? buildSeatMap(flight.code.length + flight.from.length) : new Set()), [flight]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const search = () => setScreen("results");

  const pickFlight = (f) => {
    setFlight(f);
    setSeats([]);
    setScreen("seats");
  };

  const toggleSeat = (id) => {
    if (takenSeats.has(id)) return;
    setSeats((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= pax) return prev;
      return [...prev, id];
    });
  };

  const confirmBooking = () => {
    const code = "SK" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setBookingCode(code);
    setScreen("ticket");
  };

  const reset = () => {
    setScreen("search");
    setFlight(null);
    setSeats([]);
  };

  const cityOf = (code) => AIRPORTS.find((a) => a.code === code)?.city || code;

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .sb-select { appearance: none; -webkit-appearance: none; }
        .sb-btn { transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
        .sb-btn:active { transform: scale(0.97); }
        .sb-row { transition: background .15s ease, border-color .15s ease; }
        .sb-row:hover { background: rgba(47,111,237,0.06); border-color: rgba(47,111,237,0.35); }
        .sb-seat { transition: transform .1s ease, background .15s ease, border-color .15s ease; }
        .sb-seat:hover:not(:disabled) { transform: translateY(-2px); }
        ::selection { background: #2F6FED; color: #0A0F1C; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}><Plane size={16} color="#0A0F1C" style={{ transform: "rotate(45deg)" }} /></div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>SkyHop</span>
        </div>
        {screen !== "search" && (
          <button onClick={reset} className="sb-btn" style={styles.ghostBtn}>
            <ChevronLeft size={15} /> Tìm chuyến khác
          </button>
        )}
      </div>

      {/* SEARCH */}
      {screen === "search" && (
        <div style={styles.hero}>
          <div style={styles.heroText}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#2F6FED", fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>
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

            <button onClick={search} disabled={from === to} className="sb-btn" style={{ ...styles.primaryBtn, opacity: from === to ? 0.5 : 1 }}>
              Tìm chuyến bay
            </button>
            {from === to && <div style={{ fontSize: 12, color: "#FF8A8A", marginTop: 8 }}>Điểm đi và điểm đến phải khác nhau nha.</div>}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {screen === "results" && (
        <div style={styles.section}>
          <div style={styles.boardHeader}>
            <div>
              <div style={{ fontSize: 12, color: "#8891A6", fontFamily: "'JetBrains Mono', monospace" }}>{date}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
                {cityOf(from)} → {cityOf(to)}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#8891A6", fontFamily: "'JetBrains Mono', monospace" }}>{pax} hành khách</div>
          </div>

          <div style={styles.board}>
            <div style={styles.boardColHeader}>
              <span style={{ width: 90 }}>CHUYẾN</span>
              <span style={{ width: 130 }}>GIỜ BAY</span>
              <span style={{ flex: 1 }}>HÃNG</span>
              <span style={{ width: 60 }}>CỔNG</span>
              <span style={{ width: 90, textAlign: "right" }}>GIÁ VÉ</span>
              <span style={{ width: 90 }} />
            </div>
            {flights.map((f) => (
              <div key={f.id} className="sb-row" style={styles.row}>
                <span style={{ width: 90, fontFamily: "'JetBrains Mono', monospace", color: "#2F6FED", fontWeight: 700 }}>{f.code}</span>
                <span style={{ width: 130, fontFamily: "'JetBrains Mono', monospace" }}>
                  {f.dep} <span style={{ color: "#8891A6" }}>→</span> {f.arr}
                </span>
                <span style={{ flex: 1, fontSize: 14 }}>{f.airline}</span>
                <span style={{ width: 60, fontFamily: "'JetBrains Mono', monospace", color: "#8891A6" }}>{f.gate}</span>
                <span style={{ width: 90, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {formatVND(f.price)}
                </span>
                <span style={{ width: 90, display: "flex", justifyContent: "flex-end" }}>
                  <button className="sb-btn" style={styles.selectBtn} onClick={() => pickFlight(f)}>Chọn</button>
                </span>
              </div>
            ))}
            {flights.length === 0 && (
              <div style={{ padding: 30, textAlign: "center", color: "#8891A6" }}>Không có chuyến phù hợp, thử lại nhé.</div>
            )}
          </div>
        </div>
      )}

      {/* SEATS */}
      {screen === "seats" && flight && (
        <div style={styles.section}>
          <div style={styles.boardHeader}>
            <div>
              <div style={{ fontSize: 12, color: "#8891A6", fontFamily: "'JetBrains Mono', monospace" }}>{flight.code} · {flight.dep}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>Chọn {pax} chỗ ngồi</div>
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
                            background: taken ? "#232B3D" : selected ? "#2F6FED" : "#121A2E",
                            borderColor: taken ? "#232B3D" : selected ? "#2F6FED" : "rgba(255,255,255,0.12)",
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
                        <span style={styles.legendItem}><i style={{ ...styles.legendDot, background: "#121A2E", borderColor: "rgba(255,255,255,0.12)" }} /> Còn trống</span>
              <span style={styles.legendItem}><i style={{ ...styles.legendDot, background: "#2F6FED", borderColor: "#2F6FED" }} /> Đang chọn</span>
              <span style={styles.legendItem}><i style={{ ...styles.legendDot, background: "#232B3D", borderColor: "#232B3D" }} /> Đã có người</span>
            </div>
          </div>

          <div style={styles.summaryBar}>
            <div>
              <div style={{ fontSize: 12, color: "#8891A6" }}>Tạm tính</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: "#2F6FED" }}>
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
      )}

      {/* TICKET */}
      {screen === "ticket" && flight && (
        <div style={styles.section}>
          <div style={styles.ticket}>
            <div style={styles.ticketMain}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#2DD4BF", fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
                <Check size={16} /> Đặt vé thành công
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#8891A6" }}>{cityOf(from)}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700 }}>{from}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#2F6FED" }}>{flight.dep}</div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18, color: "#3E4964" }}>
                  <div style={{ width: "100%", borderTop: "2px dashed #232B3D", position: "relative" }}>
                    <Plane size={16} color="#2F6FED" style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%) rotate(90deg)" }} />
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6 }}>{flight.duration}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#8891A6" }}>{cityOf(to)}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700 }}>{to}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#2F6FED" }}>{flight.arr}</div>
                </div>
              </div>

              <div style={styles.ticketGrid}>
                <div><div style={styles.ticketLabel}>Chuyến bay</div><div style={styles.ticketVal}>{flight.code}</div></div>
                <div><div style={styles.ticketLabel}>Hãng bay</div><div style={styles.ticketVal}>{flight.airline}</div></div>
                <div><div style={styles.ticketLabel}>Ngày bay</div><div style={styles.ticketVal}>{date}</div></div>
                <div><div style={styles.ticketLabel}>Cổng</div><div style={styles.ticketVal}>{flight.gate}</div></div>
                <div><div style={styles.ticketLabel}>Ghế</div><div style={styles.ticketVal}>{seats.sort().join(", ")}</div></div>
                <div><div style={styles.ticketLabel}>Hành lý</div><div style={styles.ticketVal}><Luggage size={13} style={{ marginRight: 4, verticalAlign: -2 }} />20kg</div></div>
              </div>
            </div>

            <div style={styles.ticketStub}>
              <div style={{ fontSize: 11, color: "#8891A6", marginBottom: 6 }}>MÃ ĐẶT CHỖ</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: "#2F6FED", letterSpacing: 2 }}>{bookingCode}</div>
              <div style={{ marginTop: 20, fontSize: 11, color: "#8891A6" }}>TỔNG THANH TOÁN</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700 }}>{formatVND(flight.price * pax)}</div>
            </div>
          </div>

          <button onClick={reset} className="sb-btn" style={{ ...styles.primaryBtn, marginTop: 20, width: 220 }}>
            Đặt thêm chuyến khác
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0B1220 0%, #0B1220 55%, #14213B 100%)",
    color: "#E7ECF5",
    fontFamily: "'Space Grotesk', sans-serif",
    padding: "0 0 60px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "22px 28px",
  },
  brand: { display: "flex", alignItems: "center", gap: 8 },
  brandIcon: {
    width: 26, height: 26, borderRadius: 8, background: "#2F6FED",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  ghostBtn: {
    display: "flex", alignItems: "center", gap: 4, background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)", color: "#E7ECF5",
    borderRadius: 999, padding: "8px 14px", fontSize: 13, cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  hero: {
    padding: "40px 28px 0",
    backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(47,111,237,0.12), transparent 60%)",
    maxWidth: 640,
    margin: "0 auto",
  },
  heroText: { textAlign: "center", marginBottom: 28 },
  panel: {
    background: "#121A2E",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  fieldRow: { display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 14 },
  field: { flex: 1 },
  label: {
    display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#8891A6",
    marginBottom: 6, letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace",
  },
  select: {
    width: "100%", background: "#0B1220", border: "1px solid rgba(255,255,255,0.1)",
    color: "#E7ECF5", borderRadius: 10, padding: "10px 12px", fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif", outline: "none",
  },
  swapBtn: {
    width: 34, height: 34, borderRadius: "50%", background: "#2F6FED", border: "none",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
    marginBottom: 2, flexShrink: 0,
  },
  stepper: {
    display: "flex", alignItems: "center", gap: 12, background: "#0B1220",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", width: "fit-content",
  },
  stepBtn: {
    width: 20, height: 20, borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent", color: "#E7ECF5", cursor: "pointer", fontSize: 14, lineHeight: 1,
  },
  primaryBtn: {
    width: "100%", background: "#2F6FED", color: "#0A0F1C", border: "none",
    borderRadius: 12, padding: "13px 20px", fontWeight: 700, fontSize: 14.5, cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif", marginTop: 4,
  },
  section: { maxWidth: 760, margin: "0 auto", padding: "10px 28px 0" },
  boardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 },
  board: {
    background: "#0A0F1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
    overflow: "hidden",
  },
  boardColHeader: {
    display: "flex", padding: "10px 18px", fontSize: 10.5, color: "#5A6479",
    letterSpacing: 1, fontFamily: "'JetBrains Mono', monospace",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  row: {
    display: "flex", alignItems: "center", padding: "16px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.05)", borderLeft: "2px solid transparent",
  },
  selectBtn: {
    background: "transparent", border: "1px solid #2F6FED", color: "#2F6FED",
    borderRadius: 999, padding: "6px 16px", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  seatPanel: {
    background: "#121A2E", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
    padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center",
  },
  planeNose: {
    fontSize: 10, letterSpacing: 3, color: "#3E4964", marginBottom: 18,
    fontFamily: "'JetBrains Mono', monospace",
  },
  seatRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  seatRowNum: { width: 18, fontSize: 11, color: "#5A6479", fontFamily: "'JetBrains Mono', monospace" },
  seat: {
    width: 32, height: 32, borderRadius: 8, border: "1px solid", fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
  },
  legend: { display: "flex", gap: 18, marginTop: 18, flexWrap: "wrap", justifyContent: "center" },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#8891A6" },
  legendDot: { width: 12, height: 12, borderRadius: 4, border: "1px solid", display: "inline-block" },
  summaryBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginTop: 18, background: "#121A2E", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: "16px 20px",
  },
  ticket: {
    display: "flex", background: "#121A2E", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  ticketMain: { flex: 1, padding: 26 },
  ticketGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 26,
    paddingTop: 20, borderTop: "1px dashed rgba(255,255,255,0.1)",
  },
  ticketLabel: { fontSize: 10.5, color: "#5A6479", letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 },
  ticketVal: { fontSize: 14, fontWeight: 600 },
  ticketStub: {
    width: 190, background: "#0A0F1C", padding: 26, borderLeft: "1px dashed rgba(255,255,255,0.15)",
    display: "flex", flexDirection: "column", justifyContent: "center",
  },
};
