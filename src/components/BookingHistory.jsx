import React, { useState } from "react";
import { styles } from "./shared/styles";
import { Modal } from "./Modal";
import { useToasts } from "../hooks/useToasts.jsx";

const daysBetween = (a, b) => Math.ceil((a - b) / (1000 * 60 * 60 * 24));

export const BookingHistory = ({ bookings = [], cancelBooking, cityOf }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const { add } = useToasts();

  const openConfirm = (b) => {
    setSelected(b);
    setConfirmOpen(true);
  };

  const doCancel = async () => {
    if (!selected) return;
    setLoading(true);
    await cancelBooking(selected.id, { status: "cancelled" });
    setLoading(false);
    setConfirmOpen(false);
    add({ title: "Hủy vé", message: `Hủy vé ${selected.bookingCode} thành công`, variant: "success", duration: 3000 });
  };

  const now = new Date();

  if (!bookings || bookings.length === 0) {
    return (
      <div style={styles.section} className="sb-section">
        <div style={{ ...styles.mutedText, padding: 30, textAlign: "center" }}>
          Bạn chưa có giao dịch nào. Đặt chuyến đầu tiên nào!
        </div>
      </div>
    );
  }

  return (
    <div style={styles.section} className="sb-section">
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Lịch sử đặt vé</div>
      <div style={{ display: "grid", gap: 12 }}>
        {bookings.map((b) => {
          const dep = new Date(b.date);
          const days = daysBetween(dep, now);
          const cancellable = days > 3 && b.status === "confirmed";

          return (
            <div key={b.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 14, borderRadius: 12, background: "var(--panel-bg)", border: "1px solid var(--border)", color: "var(--text-primary)", boxShadow: '0 8px 20px rgba(8,18,40,0.03)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700 }}>{cityOf(b.from)} → {cityOf(b.to)}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)" }}>{b.date}</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{b.flight?.code || '—'}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Ghế: {b.seats?.join(", ")}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Hành khách: {b.pax}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <div style={{ fontWeight: 700, color: b.status === 'confirmed' ? 'var(--accent)' : 'var(--danger)' }}>{b.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}</div>
                <div style={{ display: "flex", gap: 8, flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="sb-btn" onClick={() => navigator.clipboard?.writeText(b.bookingCode) } style={{ ...styles.ghostBtn }}>Mã: {b.bookingCode}</button>
                    <button className="sb-btn" onClick={() => openConfirm(b)} disabled={!cancellable} style={{ ...styles.primaryBtn, opacity: cancellable ? 1 : 0.5, width: 120 }}>{cancellable ? 'Hủy vé' : 'Hủy vé'}</button>
                  </div>
                  {!cancellable && b.status === 'confirmed' && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                      Không thể hủy vé trong vòng 3 ngày trước chuyến bay
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={confirmOpen} title={`Hủy vé ${selected?.bookingCode}`} onClose={() => setConfirmOpen(false)}>
        <div style={{ marginBottom: 12 }}>Bạn có chắc muốn hủy vé {selected?.bookingCode}?</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="sb-btn" onClick={() => setConfirmOpen(false)} style={styles.ghostBtn}>Huỷ</button>
          <button className="sb-btn" onClick={doCancel} disabled={loading} style={styles.primaryBtn}>{loading ? 'Đang xử lý...' : 'Xác nhận hủy'}</button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingHistory;
