import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './RSVPForm.scss';

interface FormData {
  name: string;
  attending: 'yes' | 'no' | '';
  guests: string;
  message: string;
}

const initialData: FormData = { name: '', attending: '', guests: '1', message: '' };

export default function RSVPForm() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.attending) return;

    setLoading(true);

    // Save to localStorage
    const rsvps = JSON.parse(localStorage.getItem('graduation_rsvps') || '[]');
    rsvps.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem('graduation_rsvps', JSON.stringify(rsvps));

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      if (form.attending === 'yes') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF5C0', '#FFFFFF', '#800020'],
        });
      }
    }, 900);
  };

  return (
    <section id="rsvp" className="rsvp-section section" ref={ref}>
      <div className="rsvp-bg" />

      <div className="rsvp-container">
        <motion.p
          className="rsvp-eyebrow"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ XÁC NHẬN THAM DỰ ✦
        </motion.p>

        <motion.h2
          className="rsvp-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          RSVP
        </motion.h2>

        <div className="ornament-divider">
          <span className="ornament-divider__line" />
          <span className="ornament-divider__star">✦</span>
          <span className="ornament-divider__line" />
        </div>

        <motion.div
          className="rsvp-card"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                className="rsvp-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <CheckCircle className="success-icon" size={56} />
                <h3 className="success-title">
                  {form.attending === 'yes' ? '🎉 Tuyệt vời!' : '💌 Đã nhận!'}
                </h3>
                <p className="success-msg">
                  {form.attending === 'yes'
                    ? `Cảm ơn ${form.name} đã xác nhận! Mình rất vui được gặp bạn ngày 30/09 nhé! 🎓`
                    : `Cảm ơn ${form.name} đã phản hồi. Rất tiếc vì bạn không đến được, nhưng mình luôn nhớ bạn! 💛`
                  }
                </p>
                <button
                  id="btn-rsvp-reset"
                  className="rsvp-reset-btn"
                  onClick={() => { setSubmitted(false); setForm(initialData); }}
                >
                  Sửa phản hồi
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                className="rsvp-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name */}
                <div className="form-field">
                  <label className="form-label" htmlFor="rsvp-name">Tên của bạn *</label>
                  <input
                    id="rsvp-name"
                    className="form-input"
                    type="text"
                    placeholder="Nhập tên bạn..."
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>

                {/* Attendance */}
                <div className="form-field">
                  <label className="form-label">Bạn có tham dự không? *</label>
                  <div className="radio-group">
                    {[
                      { value: 'yes', emoji: '🎉', label: 'Có, mình sẽ đến!' },
                      { value: 'no',  emoji: '😢', label: 'Rất tiếc, không đến được' },
                    ].map(opt => (
                      <label
                        key={opt.value}
                        className={`radio-option ${form.attending === opt.value ? 'radio-option--active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value={opt.value}
                          checked={form.attending === opt.value}
                          onChange={() => setForm(f => ({ ...f, attending: opt.value as 'yes' | 'no' }))}
                          hidden
                        />
                        <span className="radio-emoji">{opt.emoji}</span>
                        <span className="radio-text">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guest count */}
                {form.attending === 'yes' && (
                  <motion.div
                    className="form-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="form-label" htmlFor="rsvp-guests">Số người đi cùng</label>
                    <select
                      id="rsvp-guests"
                      className="form-input form-select"
                      value={form.guests}
                      onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                    >
                      <option value="1">Chỉ mình tôi</option>
                      <option value="2">Tôi + 1 người</option>
                      <option value="3">Tôi + 2 người</option>
                    </select>
                  </motion.div>
                )}

                {/* Message */}
                <div className="form-field">
                  <label className="form-label" htmlFor="rsvp-message">Lời chúc cho Quốc Hưng 💛</label>
                  <textarea
                    id="rsvp-message"
                    className="form-input form-textarea"
                    placeholder="Gửi lời chúc mừng..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <button
                  id="btn-rsvp-submit"
                  type="submit"
                  className={`rsvp-submit-btn ${loading ? 'rsvp-submit-btn--loading' : ''}`}
                  disabled={loading || !form.name || !form.attending}
                >
                  <span className="btn-shimmer" />
                  {loading ? (
                    <span>Đang gửi...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Gửi Xác Nhận</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
