export const AIRPORTS = [
  { code: "SGN", city: "TP. Hồ Chí Minh", lat: 10.8188, lon: 106.652 },
  { code: "HAN", city: "Hà Nội", lat: 21.0245, lon: 105.8412 },
  { code: "DAD", city: "Đà Nẵng", lat: 16.0439, lon: 108.199 },
  { code: "CXR", city: "Nha Trang", lat: 12.25, lon: 109.1947 },
  { code: "PQC", city: "Phú Quốc", lat: 10.229, lon: 103.9674 },
  { code: "HUI", city: "Huế", lat: 16.41, lon: 107.724 },
];

export const AIRLINES = [
  { name: "Vietrix Air", code: "VJ" },
  { name: "Skyline Bamboo", code: "QH" },
  { name: "Delta Wing", code: "VN" },
];

export function makeFlights(from, to) {
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

export function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export const SEAT_ROWS = 6;
export const SEAT_COLS = ["A", "B", "C", "D", "E", "F"];

export function buildSeatMap(seed) {
  const taken = new Set();
  const hashString = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash || 7;
  };

  let x = hashString(String(seed));
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
