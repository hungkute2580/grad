import { useState } from 'react';
import { motion } from 'framer-motion';
import vkuLogo from '@/assets/logovku.png';
import './Envelope.scss';

interface Props {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onOpen();
  };

  return (
    <div className="envelope-screen">
      {/* Ambient glow spots */}
      <div className="env-ambient env-ambient--left" />
      <div className="env-ambient env-ambient--right" />

      {/* Floating decorations */}
      <div className="floating-cap cap-tl" aria-hidden>🎓</div>
      <div className="floating-cap cap-br" aria-hidden>🎓</div>
      <div className="floating-star star-1" aria-hidden>✦</div>
      <div className="floating-star star-2" aria-hidden>✦</div>
      <div className="floating-star star-3" aria-hidden>✦</div>

      {/* The invitation card */}
      <motion.div
        className="invite-card"
        initial={{ opacity: 0, y: 80, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Inner border frame */}
        <div className="card-inner-frame" />

        {/* Header */}
        <div className="card-header">
          <img src={vkuLogo} alt="VKU Logo" className="vku-logo-img" />
          <div className="card-school-name">
            <span className="school-full">ĐẠI HỌC VIỆT - HÀN (VKU)</span>
            <span className="school-year">Vietnam-Korea University · 2026</span>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="card-divider">
          <span className="div-line" />
          <span className="div-star">✦</span>
          <span className="div-line" />
        </div>

        {/* Title area */}
        <div className="card-title-area">
          <p className="title-happy">HAPPY</p>
          <h1 className="title-graduation">Graduation</h1>
          <div className="grad-cap-center">🎓</div>
        </div>

        {/* Invite text */}
        <div className="card-invite">
          <p className="invite-formal">Trân trọng kính mời</p>
          <div className="invite-dashes">- - - - - - - - -</div>
          <p className="invite-to">Ae DEV TEAM</p>
          <div className="invite-dashes">- - - - - - - - -</div>
          <p className="invite-suffix">tới dự Lễ Tốt Nghiệp của</p>
        </div>

        {/* Graduate name */}
        <div className="card-name">
          <span className="name-display">Nguyễn Quốc Hưng</span>
        </div>
        <p className="card-degree">Tân cử nhân Công nghệ thông tin - Chuyên ngành Kỹ thuật phần mềm</p>

        {/* Event quick info */}
        <div className="card-event-info">
          <div className="event-chip">
            <span>📅</span>
            <span>Thứ Tư, 30.09.2026</span>
          </div>
          <div className="event-chip">
            <span>⏰</span>
            <span>09:00 - 12:00</span>
          </div>
        </div>
      </motion.div>

      {/* Open button */}
      <motion.button
        id="btn-mo-thiep"
        className={`open-btn ${clicked ? 'open-btn--clicked' : ''}`}
        onClick={handleClick}
        disabled={clicked}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="btn-shimmer" />
        <span className="btn-icon">✦</span>
        <span className="btn-text">{clicked ? 'Đang mở...' : 'Mở Thiệp'}</span>
        <span className="btn-icon">✦</span>
      </motion.button>

      {/* Hint text */}
      <motion.p
        className="hint-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Nhấn để mở thiệp mời!
      </motion.p>
    </div>
  );
}
