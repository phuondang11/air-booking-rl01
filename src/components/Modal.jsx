import React from "react";

export const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,16,0.42)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200 }}>
      <div style={{ background: "var(--panel-bg)", color: "var(--text-primary)", padding: 20, borderRadius: 14, width: 520, maxWidth: "94%", boxShadow: "0 12px 40px rgba(2,6,23,0.32)", border: '1px solid var(--border)' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
          <button onClick={onClose} className="sb-btn" style={{ background: "transparent", border: "none", fontSize: 18 }}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
