import React, { useEffect } from "react";
import { useBooking } from "./hooks/useBooking";
import { Header } from "./components/Header";
import { SearchPanel } from "./components/SearchPanel";
import { FlightBoard } from "./components/FlightBoard";
import { SeatMap } from "./components/SeatMap";
import { Ticket } from "./components/Ticket";
import { styles } from "./components/shared/styles";

export default function App() {
  const {
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
    clearToast,
    cityOf,
  } = useBooking();

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => clearToast(), 2800);
    return () => clearTimeout(timeout);
  }, [toast, clearToast]);

  return (
    <div style={styles.app}>
      {toast && (
        <div style={styles.toast} role="status" aria-live="polite">
          <span style={styles.toastIcon}>✓</span>
          <div>
            <div style={styles.toastTitle}>Đặt vé thành công</div>
            <div style={styles.toastText}>{toast}</div>
          </div>
        </div>
      )}

      <Header screen={screen} backToResults={backToResults} reset={reset} />

      {screen === "search" && (
        <SearchPanel
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          date={date}
          setDate={setDate}
          pax={pax}
          setPax={setPax}
          swap={swap}
          search={search}
        />
      )}

      {screen === "results" && (
        <FlightBoard
          date={date}
          from={from}
          to={to}
          pax={pax}
          flights={flights}
          pickFlight={pickFlight}
          cityOf={cityOf}
        />
      )}

      {screen === "seats" && flight && (
        <SeatMap
          flight={flight}
          pax={pax}
          seats={seats}
          takenSeats={takenSeats}
          toggleSeat={toggleSeat}
          confirmBooking={confirmBooking}
        />
      )}

      {screen === "ticket" && flight && (
        <Ticket
          flight={flight}
          from={from}
          to={to}
          date={date}
          pax={pax}
          seats={seats}
          bookingCode={bookingCode}
          reset={reset}
          cityOf={cityOf}
        />
      )}
    </div>
  );
}
