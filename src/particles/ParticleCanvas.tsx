import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  colorR: number;
  colorG: number;
  colorB: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Props {
  active?: boolean;
}

const PARTICLE_COUNT = 110;

function createParticle(width: number, height: number): Particle {
  const colorType = Math.random();
  let r: number, g: number, b: number;

  if (colorType < 0.5) {
    // Warm gold foil particles
    r = 197 + Math.random() * 30;
    g = 155 + Math.random() * 40;
    b = 39 + Math.random() * 30;
  } else if (colorType < 0.8) {
    // Champagne / warm gold sparkle
    r = 230 + Math.random() * 20;
    g = 200 + Math.random() * 30;
    b = 130 + Math.random() * 50;
  } else {
    // Deep navy floating accent dots
    r = 13 + Math.random() * 15;
    g = 27 + Math.random() * 25;
    b = 53 + Math.random() * 30;
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.8 + 0.6,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: -(Math.random() * 0.4 + 0.15),
    opacity: Math.random() * 0.45 + 0.25,
    colorR: r,
    colorG: g,
    colorB: b,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinklePhase: Math.random() * Math.PI * 2,
  };
}

export default function ParticleCanvas({ active = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let tick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity = activeRef.current ? 1 : 0.65;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed;

        if (p.y < -10) {
          Object.assign(p, createParticle(canvas.width, canvas.height));
          p.y = canvas.height + 10;
        }

        const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
        const finalOpacity = p.opacity * twinkle * opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${finalOpacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
        zIndex: 0,
      }}
    />
  );
}
