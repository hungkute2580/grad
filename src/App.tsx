import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

import ParticleCanvas from './particles/ParticleCanvas';
import Envelope from './components/Envelope/Envelope';
import HeroSection from './components/HeroSection/HeroSection';
import PoemBanner from './components/PoemBanner/PoemBanner';
import InviteMessage from './components/InviteMessage/InviteMessage';
import EventDetails from './components/EventDetails/EventDetails';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import Gallery from './components/Gallery/Gallery';
import PersonalMessage from './components/PersonalMessage/PersonalMessage';
import RSVPForm from './components/RSVPForm/RSVPForm';
import MapSection from './components/MapSection/MapSection';
import Footer from './components/Footer/Footer';

import RibbonMarquee from './components/RibbonMarquee/RibbonMarquee';
import CursorTrail from './components/CursorTrail/CursorTrail';

type Phase = 'envelope' | 'main';

function App() {
  const [phase, setPhase] = useState<Phase>('envelope');

  // Lock body scroll while envelope is active
  useEffect(() => {
    if (phase === 'envelope') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const handleOpen = () => {
    // ── Fire confetti from both sides continuously ──
    const duration = 4500;
    const end = Date.now() + duration;
    const colors = ['#D4AF37', '#FFF5C0', '#FFFFFF', '#800020', '#FFD700', '#F3E5AB'];

    // Center burst first
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { x: 0.5, y: 0.55 },
      colors,
      startVelocity: 50,
      gravity: 0.8,
    });

    // Continuous side cannons
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 },
        colors,
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 },
        colors,
        shapes: ['circle', 'square'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Switch to main after animation
    setTimeout(() => setPhase('main'), 950);
  };

  return (
    <>
      {/* Cursor trail glow effect — desktop only */}
      <CursorTrail />

      {/* Gold particle layer — always present, dims when on main */}
      <ParticleCanvas active={phase === 'envelope'} />

      {/* Envelope (exit: zoom into card = dramatic portal effect) */}
      <AnimatePresence>
        {phase === 'envelope' && (
          <motion.div
            key="envelope"
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
            exit={{
              scale: 12,
              opacity: 0,
              filter: 'blur(40px)',
              transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <Envelope onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page content - hidden completely while envelope is present */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          display: phase === 'main' ? 'block' : 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'main' ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
      >
        <HeroSection />
        <RibbonMarquee text="🎓 NGUYỄN QUỐC HƯNG ✦ TÂN CỬ NHÂN CÔNG NGHỆ THÔNG TIN ✦ VKU 2026 ✦ LỄ TỐT NGHIỆP 30.09.2026 ✦" />
        <PoemBanner />
        <RibbonMarquee reverse text="✦ BỐN NĂM MIỆT MÀI CHUNG MỘT LỐI ✦ NGÀY VUI CHẠM MỐC RẠNG TƯƠNG LAI ✦ VKU 2022 - 2026 ✦" />
        <InviteMessage />
        <RibbonMarquee text="✦ TRÂN TRỌNG KÍNH MỜI ✦ THỨ TƯ 30.09.2026 ✦ 09:00 - 12:00 ✦ ĐẠI HỌC VKU ✦" />
        <EventDetails />
        <RibbonMarquee reverse text="✦ ĐẾM NGƯỢC THỜI GIAN ✦ CHỜ ĐÓN NGÀY VUI ✦ VKU GRADUATION 2026 ✦" />
        <CountdownTimer />
        <RibbonMarquee text="✦ KỶ NIỆM ĐÁNG NHỚ ✦ HÀNH TRÌNH THANH XUÂN ✦ VKU 2022 - 2026 ✦" />
        <Gallery />
        <RibbonMarquee reverse text="✦ CẢM ƠN DEV TEAM ✦ GIỮ TRỌN THANH XUÂN CÙNG MƠ ƯỚC ✦ VKU 2026 ✦" />
        <PersonalMessage />
        <RibbonMarquee text="✦ XÁC NHẬN THAM DỰ ✦ RSVP GRADUATION 2026 ✦ NGUYỄN QUỐC HƯNG ✦" />
        <RSVPForm />
        <RibbonMarquee reverse text="✦ HƯỚNG DẪN ĐẾN NƠI ✦ TRƯỜNG ĐẠI HỌC CNTT & TT VIỆT - HÀN ✦" />
        <MapSection />
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
