import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './MapSection.scss';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Công+nghệ+thông+tin+và+Truyền+thông+Việt-Hàn+VKU+470+Trần+Đại+Nghĩa+Đà+Nẵng';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=0D1B35&bgcolor=FFFFFF&data=${encodeURIComponent(MAPS_URL)}`;
const EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.733229303668!2d108.24976707501798!3d15.97529338469033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997b072c1%3A0x8661601a755d9d78!2sVietnam-Korea%20University%20of%20Information%20and%20Communication%20Technology%20(VKU)!5e0!3m2!1svi!2svn!4v1727577600000!5m2!1svi!2svn';

export default function MapSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="map" className="map-section section" ref={ref}>
      <div className="map-bg" />

      <div className="map-container">
        <motion.p
          className="map-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ĐỊA ĐIỂM ✦
        </motion.p>

        <motion.h2
          className="map-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Hướng Dẫn Đến Nơi
        </motion.h2>

        <div className="ornament-divider">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        <div className="map-layout">
          {/* Map iframe */}
          <motion.div
            className="map-iframe-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <iframe
              title="VKU Location"
              src={EMBED_URL}
              className="map-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="map-info"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            <div className="venue-info">
              <div className="venue-icon">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div className="venue-details">
                <p className="venue-name">Trường Đại học Công nghệ thông tin và Truyền thông Việt - Hàn</p>
                <p className="venue-address">470 Trần Đại Nghĩa</p>
                <p className="venue-address">Ngũ Hành Sơn, TP Đà Nẵng</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="map-qr">
              <div className="qr-card">
                <img src={QR_URL} alt="QR Code dẫn đến Google Maps" className="qr-img" />
              </div>
              <p className="qr-hint">Quét QR để mở Google Maps</p>
            </div>

            {/* Navigate button */}
            <a
              id="btn-navigate"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="navigate-btn"
            >
              <span className="btn-shimmer" />
              <Navigation size={16} strokeWidth={2} />
              <span>Chỉ Đường Đến Đây</span>
            </a>

            <p className="map-note">
              📍 Gặp nhau ở đó nhé! Hẹn ngày 30/09 🎓
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
