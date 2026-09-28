import './RibbonMarquee.scss';

interface RibbonMarqueeProps {
  text?: string;
  reverse?: boolean;
}

export default function RibbonMarquee({
  text = '🎓 NGUYỄN QUỐC HƯNG ✦ TÂN CỬ NHÂN CÔNG NGHỆ THÔNG TIN ✦ VKU 2026 ✦ LỄ TỐT NGHIỆP 30.09.2026 ✦',
  reverse = false,
}: RibbonMarqueeProps) {
  // Repeat items for continuous seamless loop
  const items = Array(8).fill(text);

  return (
    <div className={`ribbon-marquee-wrapper ${reverse ? 'ribbon-marquee-wrapper--reverse' : ''}`} aria-hidden>
      <div className="ribbon-marquee-track">
        {items.map((item, index) => (
          <span key={index} className="ribbon-marquee-item">
            {item}
          </span>
        ))}
      </div>
      <div className="ribbon-marquee-track" aria-hidden>
        {items.map((item, index) => (
          <span key={`dup-${index}`} className="ribbon-marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
