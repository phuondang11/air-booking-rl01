import { useState, useMemo } from "react";
import { makeFlights, buildSeatMap, AIRPORTS } from "../data/flights";

export const useBooking = () => {
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
  const [toast, setToast] = useState("");

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

  const search = () => {
    setToast("");
    setScreen("results");
  };

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
    setToast("Đặt vé thành công! Chuyến bay của bạn đã được xác nhận.");
    setScreen("ticket");
  };

  const backToResults = () => {
    setToast("");
    setScreen("results");
    setFlight(null);
    setSeats([]);
    setBookingCode("");
  };

  const reset = () => {
    setToast("");
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
    toast,
    flights,
    takenSeats,
    swap,
    search,
    pickFlight,
    toggleSeat,
    confirmBooking,
    backToResults,
    reset,
    clearToast: () => setToast(""),
    cityOf
  };
};
