import { useState, useMemo, useEffect } from "react";
import { useToasts } from "./useToasts.jsx";
import { makeFlights, buildSeatMap, AIRPORTS } from "../data/flights";

export const useBooking = () => {
  const [screen, setScreen] = useState("search"); // search | results | seats | ticket | history
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
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sb_bookings");
      if (raw) setBookings(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
      setBookings([]);
    }
  }, []);

  // Persist bookings whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("sb_bookings", JSON.stringify(bookings));
    } catch (e) {
      // ignore storage errors
    }
  }, [bookings]);

  const flights = useMemo(
    () => makeFlights(from, to).filter((f) => f.seatsLeft >= pax),
    [from, to, pax]
  );

  const takenSeats = useMemo(() =>
    (flight ? buildSeatMap(flight.id) : new Set()),
    [flight]
  );

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

  const { add } = useToasts();

  const confirmBooking = () => {
    const code = "SK" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setBookingCode(code);
    add({ variant: "success", title: "Đặt vé thành công", message: "Chuyến bay của bạn đã được xác nhận." });
    setScreen("ticket");
    // Snapshot booking and persist
    try {
      const record = {
        id: code,
        flight: flight,
        from,
        to,
        date,
        pax,
        seats,
        bookingCode: code,
        purchasedAt: new Date().toISOString(),
        status: "confirmed",
      };
      setBookings((prev) => [record, ...prev]);
    } catch (e) {
      // ignore
    }
  };

  const cancelBooking = (id, updates = {}) => {
    // returns a promise to simulate async
    return new Promise((resolve) => {
      setTimeout(() => {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
        resolve(true);
      }, 900);
    });
  };

  const backToResults = () => {
    setScreen("results");
    setFlight(null);
    setSeats([]);
    setBookingCode("");
  };

  const reset = () => {
    setScreen("search");
    setFlight(null);
    setSeats([]);
    setBookingCode("");
  };

  const cityOf = (code) => AIRPORTS.find((a) => a.code === code)?.city || code;

  return {
    screen,
    from, setFrom,
    to, setTo,
    date, setDate,
    pax, setPax,
    flight,
    seats,
    bookingCode,
    bookings,
    flights,
    takenSeats,
    swap,
    search,
    pickFlight,
    toggleSeat,
    confirmBooking,
    backToResults,
    reset,
    // toast handled by ToastProvider
    cancelBooking,
    setScreen,
    cityOf
  };
};
