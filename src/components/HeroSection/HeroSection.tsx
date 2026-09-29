import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import avatarImg from '@/assets/avatar.png';
import vkuLogo from '@/assets/logovku.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './HeroSection.scss';

const nameWords = [
  { word: 'NGUYỄN', chars: ['N', 'G', 'U', 'Y', 'Ễ', 'N'] },
  { word: 'QUỐC', chars: ['Q', 'U', 'Ố', 'C'] },
  { word: 'HƯNG', chars: ['H', 'Ư', 'N', 'G'] },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' } as object
  },
};

const GoldStar = ({ size = 28, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="currentColor"
    className={`gold-star-svg ${className}`}
    aria-hidden
  >
    <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
  </svg>
);

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.05);

  return (
    <section id="hero" className="hero-section" ref={ref}>
      {/* Animated background */}
      <div className="hero-bg" />
      <div className="hero-bg-glow hero-bg-glow--gold" />
      <div className="hero-bg-glow hero-bg-glow--crimson" />

      {/* Vertical Ceremonial Side Banners (Left & Right) */}
      <motion.div
        className="side-banner side-banner--left"
        initial={{ opacity: 0, y: -140 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="side-banner__badge side-banner__badge--logo">
          <img src={vkuLogo} alt="VKU Logo" className="side-banner__logo-img" />
        </div>
        <div className="side-banner__stitch" />
        <div className="side-banner__body">
          <span className="side-banner__text side-banner__text--upright">V K U</span>
        </div>
        <div className="side-banner__tag">
          <span>2026</span>
        </div>
        <div className="side-banner__tail" />
      </motion.div>

      <motion.div
        className="side-banner side-banner--right"
        initial={{ opacity: 0, y: -140 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="side-banner__badge side-banner__badge--cap">
          <span>🎓</span>
        </div>
        <div className="side-banner__stitch" />
        <div className="side-banner__body">
          <span className="side-banner__text side-banner__text--script">Nguyễn Quốc Hưng</span>
        </div>
        <div className="side-banner__tag">
          <span>CNTT</span>
        </div>
        <div className="side-banner__tail" />
      </motion.div>

      {/* 4-Point Concave Gold Stars Floating & Twinkling */}
      <div className="hero-sparkles-container" aria-hidden>
        <motion.div
          className="star-wrapper star-1"
          animate={{ y: [0, -20, 0], x: [0, 8, 0], scale: [0.8, 1.25, 0.8], opacity: [0.4, 1, 0.4], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GoldStar size={36} />
        </motion.div>

        <motion.div
          className="star-wrapper star-2"
          animate={{ y: [0, -25, 0], x: [0, -10, 0], scale: [0.7, 1.15, 0.7], opacity: [0.3, 0.9, 0.3], rotate: [-15, 10, -15] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <GoldStar size={26} />
        </motion.div>

        <motion.div
          className="star-wrapper star-3"
          animate={{ y: [0, -18, 0], x: [0, 6, 0], scale: [0.85, 1.3, 0.85], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <GoldStar size={42} />
        </motion.div>

        <motion.div
          className="star-wrapper star-4"
          animate={{ y: [0, -22, 0], x: [0, -8, 0], scale: [0.75, 1.2, 0.75], opacity: [0.3, 0.95, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <GoldStar size={22} />
        </motion.div>

        <motion.div
          className="star-wrapper star-5"
          animate={{ y: [0, -16, 0], scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
        >
          <GoldStar size={30} />
        </motion.div>

        <motion.div
          className="star-wrapper star-6"
          animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [0.65, 1.1, 0.65], opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <GoldStar size={20} />
        </motion.div>

        <motion.div
          className="star-wrapper star-7"
          animate={{ y: [0, -15, 0], x: [0, -6, 0], scale: [0.8, 1.25, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut', delay: 2.6 }}
        >
          <GoldStar size={28} />
        </motion.div>

        <motion.div
          className="star-wrapper star-8"
          animate={{ y: [0, -20, 0], scale: [0.7, 1.15, 0.7], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <GoldStar size={34} />
        </motion.div>
      </div>

      <div className="hero-content">
        {/* Top badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>✦</span>
          <span>HAPPY GRADUATION · VKU 2026</span>
          <span>✦</span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          className="hero-avatar-wrapper"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="avatar-ring avatar-ring--outer" />
          <div className="avatar-ring avatar-ring--inner" />
          <img
            src={avatarImg}
            alt="Nguyễn Quốc Hưng - VKU Graduation 2026"
            className="hero-avatar"
          />
          <div className="avatar-glow" />
        </motion.div>

        {/* Name — word-by-word structure prevents accidental mid-word wrapping */}
        <motion.div
          className="hero-name"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{ perspective: '600px' }}
          aria-label="Nguyễn Quốc Hưng"
        >
          {nameWords.map((w, wi) => (
            <span key={wi} className="hero-name__word">
              {w.chars.map((char, ci) => (
                <motion.span
                  key={ci}
                  className="hero-name__char"
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>

        {/* Ribbon Banner for Degree */}
        <motion.div
          className="ribbon-banner"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          <div className="ribbon-banner__tail ribbon-banner__tail--left" aria-hidden />
          <div className="ribbon-banner__fold ribbon-banner__fold--left" aria-hidden />

          <div className="ribbon-banner__main">
            <div className="ribbon-banner__stitch">
              <span className="degree-title">Tân cử nhân Công nghệ thông tin</span>
              <span className="degree-sep">|</span>
              <span className="degree-sub">Chuyên ngành Kỹ thuật phần mềm</span>
            </div>
          </div>

          <div className="ribbon-banner__fold ribbon-banner__fold--right" aria-hidden />
          <div className="ribbon-banner__tail ribbon-banner__tail--right" aria-hidden />
        </motion.div>

        {/* School info */}
        <motion.div
          className="hero-school"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <span className="school-dot">◆</span>
          <span className="school-name">
            <span className="school-name__line">Trường Đại học Công nghệ thông tin</span>
            <span className="school-name__line">và Truyền thông Việt - Hàn</span>
          </span>
          <span className="school-dot">◆</span>
        </motion.div>

        {/* Year tag */}
        <motion.div
          className="hero-year-tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          2022 - 2026
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          className="hero-ornament"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="ornament-line" />
          <span className="ornament-diamond">◆</span>
          <span className="ornament-text">More Knowledge · Brighter Tomorrow</span>
          <span className="ornament-diamond">◆</span>
          <span className="ornament-line" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Same Friends · Bigger Dreams
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll để xem thiệp</span>
        </motion.div>
      </div>
    </section>
  );
}
