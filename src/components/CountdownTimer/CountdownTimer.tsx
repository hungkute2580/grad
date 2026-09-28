import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './CountdownTimer.scss';

// Target: 30/09/2026 10:00 AM Vietnam Time (UTC+7 = UTC+0 - 3h = 03:00 UTC)
const TARGET = new Date('2026-09-30T03:00:00Z');

interface UnitProps {
  value: number;
  label: string;
}

function CountUnit({ value, label }: UnitProps) {
  const display = String(value).padStart(2, '0');
  const prevRef = useRef(display);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== display) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 500);
      prevRef.current = display;
      return () => clearTimeout(t);
    }
  }, [display]);

  return (
    <div className="count-unit">
      <div className={`count-card ${flipping ? 'count-card--flip' : ''}`}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="count-number"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
        <div className="count-card__divider" />
      </div>
      <span className="count-label">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const timeLeft = useCountdown(TARGET);
  const isPast = Object.values(timeLeft).every(v => v === 0);

  const units = [
    { value: timeLeft.days, label: 'Ngày' },
    { value: timeLeft.hours, label: 'Giờ' },
    { value: timeLeft.minutes, label: 'Phút' },
    { value: timeLeft.seconds, label: 'Giây' },
  ];

  return (
    <section id="countdown" className="countdown-section section" ref={ref}>
      <div className="countdown-bg" />

      <div className="countdown-container">
        <motion.p
          className="countdown-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ĐẾM NGƯỢC ✦
        </motion.p>

        <motion.h2
          className="countdown-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {isPast ? 'Hôm nay là ngày trọng đại! 🎉' : 'Còn bao lâu nữa?'}
        </motion.h2>

        {!isPast && (
          <motion.div
            className="countdown-units"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {units.map((u, i) => (
              <div key={u.label} className="countdown-unit-wrapper">
                <CountUnit value={u.value} label={u.label} />
                {i < units.length - 1 && (
                  <span className="countdown-separator">:</span>
                )}
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          className="countdown-sub"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Thứ Tư, 30 tháng 09 năm 2026 · 10:00 – 12:00
        </motion.p>
      </div>
    </section>
  );
}
