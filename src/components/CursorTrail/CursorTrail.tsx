import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only enable on desktop (non-touch)
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add a new trail point at current position
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: 6 + Math.random() * 5,
      });

      // Limit trail length
      if (pointsRef.current.length > 60) {
        pointsRef.current.shift();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const len = points.length;

      for (let i = 0; i < len; i++) {
        const pt = points[i];
        const progress = i / len; // 0 = oldest, 1 = newest

        // Gold glow core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * progress, 0, Math.PI * 2);
        ctx.shadowBlur = 18 * progress;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
        ctx.fillStyle = `rgba(244, 211, 94, ${0.7 * progress * pt.alpha})`;
        ctx.fill();

        // Soft outer halo
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * progress * 2.5, 0, Math.PI * 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(212, 175, 55, ${0.08 * progress * pt.alpha})`;
        ctx.fill();

        // Fade out over time
        pt.alpha -= 0.025;
      }

      // Remove fully faded points
      pointsRef.current = pointsRef.current.filter(p => p.alpha > 0);

      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden
    />
  );
}
