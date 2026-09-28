import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './EventDetails.scss';

const details = [
  {
    id: 'date',
    icon: Calendar,
    label: 'Ngày',
    value: 'Thứ Tư',
    main: '30 · 09 · 2026',
    mapUrl: null,
  },
  {
    id: 'time',
    icon: Clock,
    label: 'Giờ',
    value: 'Buổi sáng',
    main: '10:00 - 12:00',
    mapUrl: null,
  },
  {
    id: 'venue',
    icon: MapPin,
    label: 'Địa điểm',
    value: 'Đại học VKU',
    main: 'Trường Đại học Công nghệ thông tin\nvà Truyền thông Việt - Hàn',
    mapUrl: 'https://maps.google.com/?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%C3%B4ng+ngh%E1%BB%87+th%C3%B4ng+tin+v%C3%A0+Truy%E1%BB%81n+th%C3%B4ng+Vi%E1%BB%87t+-+H%C3%A0n',
  },
];

const contacts = [
  { icon: Phone, text: '0344 578 091', href: 'tel:0344578091' },
  { icon: Mail, text: 'hungkute2580@gmail.com', href: 'mailto:hungkute2580@gmail.com' },
];

export default function EventDetails() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="event-details" className="event-section section" ref={ref}>
      <div className="event-bg" />

      <div className="event-container">
        {/* Title */}
        <motion.p
          className="event-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ THÔNG TIN LỄ ✦
        </motion.p>

        <motion.h2
          className="event-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Lễ Tốt Nghiệp
        </motion.h2>

        <div className="ornament-divider">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        {/* Detail cards */}
        <div className="detail-cards">
          {details.map((d, i) => (
            <motion.div
              key={d.id}
              className={`detail-card ${d.mapUrl ? 'detail-card--has-link' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="detail-card__glow" />
              <div className="detail-card__icon-wrap">
                <d.icon size={22} strokeWidth={1.5} />
              </div>
              <span className="detail-card__label">{d.label}</span>
              <span className="detail-card__value">{d.value}</span>
              <span className="detail-card__main">{d.main}</span>
              {d.mapUrl && (
                <a
                  href={d.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-card__map-btn"
                >
                  <span>Chỉ đường Maps</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dress code */}
        <motion.div
          className="dress-code-banner"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className="dress-code__label">Dress Code</span>
          <span className="dress-code__divider" />
          <span className="dress-code__value">👔 Lịch sự - Smart Casual</span>
        </motion.div>

        {/* Contacts */}
        <motion.div
          className="event-contacts"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          {contacts.map((c, i) => (
            <a key={i} href={c.href} className="contact-chip">
              <c.icon size={14} strokeWidth={1.5} />
              <span>{c.text}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
