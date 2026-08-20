import React from "react";
import { Plane, ChevronLeft } from "lucide-react";
import { styles } from "./shared/styles";

export const Header = ({ screen, backToResults, reset }) => {
  const handleBack = () => {
    if (screen === "ticket" || screen === "seats") {
      backToResults();
      return;
    }
    reset();
  };

  return (
    <div style={styles.header} className="sb-header">
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <Plane size={16} color="#0A0F1C" style={{ transform: "rotate(45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>
          SkyHop
        </span>
      </div>
      {screen !== "search" && (
        <button onClick={handleBack} className="sb-btn" style={styles.ghostBtn}>
          <ChevronLeft size={15} /> Tìm chuyến khác
        </button>
      )}
    </div>
  );
};
