import React, { useEffect } from "react";
import { useBooking } from "./hooks/useBooking";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner.jsx";
import { SearchPanel } from "./components/SearchPanel";
import { FlightBoard } from "./components/FlightBoard";
import { SeatMap } from "./components/SeatMap";
import { Ticket } from "./components/Ticket";
import { BookingHistory } from "./components/BookingHistory";
import { styles } from "./components/shared/styles";
import { ToastProvider } from "./hooks/useToasts.jsx";
import { ToastContainer } from "./components/ToastContainer";
import { useTheme } from "./hooks/useTheme.jsx";
import HomeSections from './components/HomeSections';
import Footer from './components/Footer';

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
    cancelBooking,
    setScreen,
    cityOf,
  } = useBooking();

  const { theme, toggleTheme } = useTheme();

  
  return (
    <ToastProvider>
      <div style={styles.app}>
      {screen === 'search' && (<HeroBanner from={from} cityOf={cityOf} />)}
      {screen === 'search' && (
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ height: 0 }} />
        </div>
      )}
   

      <Header screen={screen} backToResults={backToResults} reset={reset} setScreen={setScreen} theme={theme} toggleTheme={toggleTheme} from={from} cityOf={cityOf} />

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

      {screen === "history" && (
        <BookingHistory bookings={bookings} cancelBooking={cancelBooking} cityOf={cityOf} />
      )}
      {screen === 'search' && (
        <>
          <HomeSections setTo={setTo} scrollToDatVe={() => document.getElementById('dat-ve')?.scrollIntoView({ behavior: 'smooth' })} />
          <Footer />
        </>
      )}
      <ToastContainer />
      </div>
    </ToastProvider>
  );
}
