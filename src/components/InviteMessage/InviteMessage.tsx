import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './InviteMessage.scss';

const emojis = [' 🐍', ' 🐍', ' 🐍', ' 🐍', ' 🐍', ' 🐍'];

export default function InviteMessage() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="invite" className="invite-section section" ref={ref}>
      <div className="invite-bg" />

      <div className="invite-container">
        {/* Section label */}
        <motion.p
          className="invite-label"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ NHÂN DỊP NGÀY MÌNH TỐT NGHIỆP ✦
        </motion.p>

        {/* Formal line */}
        <motion.h2
          className="invite-formal-text"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Trân trọng kính mời
        </motion.h2>

        {/* DEV TEAM callout */}
        <motion.div
          className="devteam-callout"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.025, boxShadow: '0 20px 45px rgba(13, 27, 53, 0.12), 0 0 25px rgba(197, 155, 39, 0.25)' }}
        >
          <div className="devteam-emoji-row" aria-hidden>
            {emojis.map((e, i) => (
              <motion.span
                key={i}
                className="devteam-emoji"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <span className="devteam-name">Ae DEV TEAM</span>
        </motion.div>

        {/* Main invite text */}
        <motion.div
          className="invite-body"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.9 }}
        >
          <p className="invite-body__main">
            tới chung vui cùng mình trong ngày trọng đại này! 🎓
          </p>

          <motion.div
            className="invite-body__card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p>
              Cảm ơn mọi người đã đồng hành suốt chặng đường vừa qua,
              cùng nhau <strong>debug lúc 1h sáng </strong> (dỡn chứ giờ này mình ngủ rồi), cùng nhau{' '}
              <strong>push code deadline</strong>, cùng nhau{' '}
              <strong>ship feature rồi lại rollback</strong> 😄
            </p>
            <p>
              Một dịp quan trọng trong đời, mình muốn thấy sự góp mặt của mọi người.
              Hãy đến để cùng mình đặt dấu <strong>commit</strong> cuối cùng
              cho chặng đường đại học này nhé! ❤️
            </p>
          </motion.div>

          <motion.p
            className="invite-body__sign"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            - Nguyễn Quốc Hưng 💛
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
