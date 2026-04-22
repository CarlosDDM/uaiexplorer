'use client';
import { useEffect, useRef } from 'react';

type UniverseAnimationProps = {
  children?: React.ReactNode;
};

export function UniverseAnimation({ children }: UniverseAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const W = canvas.width;
    const H = canvas.height;

    const LAYERS = [
      {
        count: 180,
        speed: 0.08,
        size: [0.5, 1.2] as [number, number],
        alpha: [0.3, 0.6] as [number, number],
      },
      {
        count: 100,
        speed: 0.2,
        size: [1.0, 2.0] as [number, number],
        alpha: [0.5, 0.8] as [number, number],
      },
      {
        count: 40,
        speed: 0.45,
        size: [1.5, 3.0] as [number, number],
        alpha: [0.7, 1.0] as [number, number],
      },
    ];

    const COLORS = ['#ffffff', '#cce0ff', '#ffd9b3', '#d4b8ff', '#b8ffe0'];

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    type Star = {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    };

    type Shooter = {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      alpha: number;
      life: number;
    };

    const stars: Star[] = [];
    LAYERS.forEach(({ count, speed, size, alpha }) => {
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        stars.push({
          x: rand(0, W),
          y: rand(0, H),
          size: rand(...size),
          speed,
          alpha: rand(...alpha),
          baseAlpha: rand(...alpha),
          twinkleSpeed: rand(0.005, 0.025),
          twinklePhase: rand(0, Math.PI * 2),
          color,
        });
      }
    });

    const shooters: Shooter[] = [];
    let lastShot = 0;
    let animId: number;

    function spawnShooter() {
      shooters.push({
        x: rand(W * 0.1, W * 0.9),
        y: rand(0, H * 0.4),
        len: rand(80, 180),
        speed: rand(12, 22),
        angle: rand(0.3, 0.7),
        alpha: 1,
        life: 1,
      });
    }

    function draw(ts: number) {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#05060f';
      ctx.fillRect(0, 0, W, H);

      // Nebulosas
      const grd = ctx.createRadialGradient(
        W * 0.3,
        H * 0.4,
        0,
        W * 0.3,
        H * 0.4,
        W * 0.55,
      );
      grd.addColorStop(0, 'rgba(60,30,120,0.18)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      const grd2 = ctx.createRadialGradient(
        W * 0.75,
        H * 0.6,
        0,
        W * 0.75,
        H * 0.6,
        W * 0.4,
      );
      grd2.addColorStop(0, 'rgba(20,60,100,0.14)');
      grd2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, W, H);

      // Estrelas
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H + s.size) {
          s.y = -s.size;
          s.x = rand(0, W);
        }
        s.twinklePhase += s.twinkleSpeed;
        s.alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size * 2.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Estrelas cadentes
      if (ts - lastShot > rand(1800, 4000)) {
        spawnShooter();
        lastShot = ts;
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.035;

        if (s.life <= 0 || s.x > W + 200 || s.y > H + 200) {
          shooters.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.len * s.life;
        const tailY = s.y - Math.sin(s.angle) * s.len * s.life;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(200,220,255,${s.life * 0.95})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * s.life;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className='relative w-full'>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full block rounded'
        style={{ background: '#05060f' }}
      />

      <div className='relative flex flex-col items-center justify-center gap-4 py-20 px-4'>
        {children}
      </div>
    </div>
  );
}
