import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './PersonalMessage.scss';

const MESSAGE_LINES = [
  'Bốn năm ngắn ngủi mà dài,',
  'Nhớ những đêm thức, nhớ lần code ngu.',
  '',
  'Sập web, hư port, deadline',
  'Chẳng ngại gian khó vì có Gemini rồi nè! 😭',
  '',
  'Hôm nay bước ngoặt đến rồi,',
  'Cảm ơn TEAM DEV, suốt đời bên nhau! 🫶',
];

export default function PersonalMessage() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= MESSAGE_LINES.length) clearInterval(interval);
    }, 350);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="personal-message" className="message-section section" ref={ref}>
      <div className="message-bg" />

      <div className="message-container">
        <motion.p
          className="message-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ĐÔI LỜI ✦
        </motion.p>

        <motion.h2
          className="message-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Gửi Đến Ae DEV TEAM
        </motion.h2>

        <div className="ornament-divider">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        <motion.div
          className="message-card"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Opening quote mark */}
          <span className="message-quote message-quote--open">"</span>

          <div className="message-poem">
            {MESSAGE_LINES.map((line, i) => (
              <motion.p
                key={i}
                className={`message-poem__line ${line === '' ? 'message-poem__line--spacer' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={visibleLines > i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Closing quote mark */}
          <span className="message-quote message-quote--close">"</span>

          {/* Signature */}
          <motion.div
            className="message-signature"
            initial={{ opacity: 0 }}
            animate={visibleLines >= MESSAGE_LINES.length ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="sig-line" />
            <p className="sig-name">Nguyễn Quốc Hưng</p>
            <p className="sig-sub">VKU · 2022 - 2026</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
