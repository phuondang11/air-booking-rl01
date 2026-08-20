import React from "react";
import { useToasts } from "../hooks/useToasts.jsx";
import { styles } from "./shared/styles.js";

const ToastItem = ({ t, onClose }) => {
  const color = t.variant === "success" ? "var(--success)" : t.variant === "error" ? "var(--danger)" : "var(--accent)";
  return (
    <div style={{ ...styles.toast, borderLeft: `4px solid ${color}`, background: 'var(--panel-bg)', color: 'var(--text-primary)' }}>
      <div style={{ fontWeight: 700 }}>{t.title}</div>
      <div style={{ marginLeft: "auto", opacity: 0.9 }}>{t.message}</div>
      <button onClick={() => onClose(t.id)} className="sb-btn" style={{ marginLeft: 8, background: "transparent", border: "none" }}>✕</button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, remove } = useToasts();

  return (
    <div style={{ position: "fixed", top: 16, right: 16, display: "flex", flexDirection: "column", gap: 12, zIndex: 1300 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ animation: "sb-toast-in .18s ease" }}>
          <ToastItem t={t} onClose={remove} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
