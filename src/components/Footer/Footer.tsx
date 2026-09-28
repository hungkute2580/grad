import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg" />
      <div className="footer-container">
        {/* Ornament */}
        <div className="ornament-divider footer-ornament">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        {/* Graduation cap */}
        <div className="footer-cap" aria-hidden>🎓</div>

        {/* Names */}
        <div className="footer-name">Nguyễn Quốc Hưng</div>
        <div className="footer-school">Trường Đại học Công nghệ thông tin và Truyền thông Việt - Hàn · 2022 – 2026</div>

        {/* Quote */}
        <p className="footer-quote">
          "Cả đời chỉ có một lần, lời hay ý đẹp ân cần trao tay."
        </p>

        {/* Separator */}
        <div className="footer-sep" />

        {/* Credits */}
        <p className="footer-credit">
          Made with <span className="heart">❤️</span> for{' '}
          <span className="footer-team">Ae DEV TEAM</span> · 2026
        </p>

        {/* Contact */}
        <div className="footer-contacts">
          <a href="tel:0344578091" className="footer-link">📞 0344 578 091</a>
          <span className="footer-dot">·</span>
          <a href="mailto:hungkute2580@gmail.com" className="footer-link">✉️ hungkute2580@gmail.com</a>
        </div>

        {/* Motto */}
        <p className="footer-motto">More Knowledge · Brighter Tomorrow</p>
      </div>
    </footer>
  );
}
