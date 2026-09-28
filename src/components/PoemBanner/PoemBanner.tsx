import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './PoemBanner.scss';

const POEMS = [
  {
    line1: 'Cả đời chỉ có một lần,',
    line2: 'Lời hay ý đẹp ân cần trao tay.',
  },
  {
    line1: 'Bốn năm miệt mài chung một lối,',
    line2: 'Ngày vui chạm mốc rạng tương lai.',
  },
  {
    line1: 'Tri thức đơm hoa ngày hái quả,',
    line2: 'Bạn bè tụ hội ấm tình thân.',
  },
  {
    line1: 'Giữ trọn thanh xuân cùng mơ ước,',
    line2: 'Vững bước đường đời ngát hương thơm.',
  },
];

const AUTO_PLAY_MS = 4500;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function PoemBanner() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const poemIndex = ((page % POEMS.length) + POEMS.length) % POEMS.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_MS);

    return () => clearInterval(timer);
  }, [isVisible, isPaused, paginate]);

  const handleDotClick = (targetIndex: number) => {
    const diff = targetIndex - poemIndex;
    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
    }
  };

  return (
    <div className="poem-banner section" ref={ref}>
      <div className="poem-bg" />

      <div className="poem-carousel-outer">
        {/* Navigation Arrow Buttons positioned further out */}
        <button
          className="poem-nav-btn poem-nav-btn--prev"
          onClick={() => paginate(-1)}
          aria-label="Câu thơ trước"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="poem-nav-btn poem-nav-btn--next"
          onClick={() => paginate(1)}
          aria-label="Câu thơ tiếp"
        >
          <ChevronRight size={24} />
        </button>

        <motion.div
          className="poem-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Opening star */}
          <motion.div
            className="poem-star poem-star--open"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ✦
          </motion.div>

          {/* Swipeable & animated poem slide */}
          <div className="poem-slide-wrapper">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.blockquote
                key={page}
                className="poem-text"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 32 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  filter: { duration: 0.25 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -60) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold || offset.x > 60) {
                    paginate(-1);
                  }
                }}
              >
                <span className="poem-line">
                  {POEMS[poemIndex].line1}
                </span>
                <span className="poem-line poem-line--highlight">
                  {POEMS[poemIndex].line2}
                </span>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Closing star */}
          <motion.div
            className="poem-star poem-star--close"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            ✦
          </motion.div>

          {/* Indicator dots */}
          <div className="poem-dots">
            {POEMS.map((_, index) => (
              <button
                key={index}
                className={`dot ${poemIndex === index ? 'dot--active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Chuyển tới câu thơ ${index + 1}`}
              />
            ))}
          </div>

          {/* Gold accent vertical lines */}
          <motion.div
            className="poem-accent-left"
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.div
            className="poem-accent-right"
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
