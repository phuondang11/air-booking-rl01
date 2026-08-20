import React from 'react';
import { styles } from './shared/styles';

export const Footer = () => {
  return (
    <footer style={{ marginTop: 40, padding: '36px 28px', background: 'var(--panel-bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SH</div>
            <div style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>SkyHop</div>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Đặt vé máy bay nhanh chóng, giá tốt và hỗ trợ tận tâm.</div>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Khám phá</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#home-top" style={{ color: 'var(--accent)' }}>Trang chủ</a></li>
              <li><a href="#gioi-thieu" style={{ color: 'var(--accent)' }}>Giới thiệu</a></li>
              <li><a href="#dat-ve" style={{ color: 'var(--accent)' }}>Đặt vé</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Hỗ trợ</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Điều khoản</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>© 2026 SkyHop</div>
    </footer>
  );
};

export default Footer;
