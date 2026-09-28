import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import camTrai from '@/assets/camtrai.jpg';
import gioHoc from '@/assets/giohoc.jpg';
import danhBida from '@/assets/danhbida.jpg';
import thayGiao from '@/assets/thaygiao.jpg';
import danhBai from '@/assets/danhbai.jpg';
import nguTrongLop from '@/assets/ngutronglop.jpg';
import sinhNhatKien from '@/assets/sinhnhatcuathanhvien_Kien.jpg';
import chaoCoChao from '@/assets/chaocochao.jpg';
import './Gallery.scss';

const photos = [
  { src: camTrai, caption: 'Hội cắm trại VKU - Đêm lửa trại bùng cháy ⛺️', alt: 'Kỷ niệm cắm trại VKU' },
  { src: gioHoc, caption: 'Những giờ học hăng hái trên giảng đường 📚', alt: 'Giờ học VKU' },
  { src: danhBida, caption: 'Giải trí sau giờ học - Trận bida nảy lửa 🎱', alt: 'Đánh bida cùng bạn' },
  { src: thayGiao, caption: 'Kỷ niệm quý giá bên 1 Thầy Giáo hiền hậu 👨‍🏫', alt: 'Bên thầy giáo VKU' },
  { src: danhBai, caption: 'Tụ tập vui vẻ sau những giờ chạy deadline 🃏', alt: 'Giải trí cùng bạn' },
  { src: nguTrongLop, caption: 'Khoảnh khắc ngô nghê - Tranh thủ ngủ trong giờ học 😴', alt: 'Ngủ gật trong lớp' },
  { src: sinhNhatKien, caption: 'Mừng sinh nhật của Kiên - ấm áp cùng các thành viên 🎂', alt: 'Sinh nhật thành viên Kiên' },
  { src: chaoCoChao, caption: 'Chào cờ chào - Trang nghiêm và tự hào dưới mái trường 🫡', alt: 'Kỷ niệm chào cờ' },
];

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i! - 1 + photos.length) % photos.length);
  const next = () => setLightbox(i => (i! + 1) % photos.length);

  return (
    <section id="gallery" className="gallery-section section" ref={ref}>
      <div className="gallery-bg" />

      <div className="gallery-container">
        <motion.p
          className="gallery-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ KỶ NIỆM ✦
        </motion.p>

        <motion.h2
          className="gallery-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Những Tháng Ngày Đáng Nhớ
        </motion.h2>

        <div className="ornament-divider">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        {/* Photo grid */}
        <div className="gallery-grid">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              className="gallery-item"
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(i)}
            >
              <div className="gallery-item__img-wrap">
                <img src={p.src} alt={p.alt} className="gallery-item__img" />
                <div className="gallery-item__overlay">
                  <p className="gallery-item__caption">{p.caption}</p>
                  <span className="gallery-item__zoom">Xem ảnh</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                className="lightbox__img"
              />
              <p className="lightbox__caption">{photos[lightbox].caption}</p>

              <button id="btn-lightbox-prev" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous">‹</button>
              <button id="btn-lightbox-next" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next">›</button>
              <button id="btn-lightbox-close" className="lightbox__close" onClick={closeLightbox} aria-label="Close">
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
