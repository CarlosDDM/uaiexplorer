type Range = [number, number];

type Layer = {
  count: number;
  speed: number;
  size: Range;
  alpha: Range;
};

const LAYERS: Layer[] = [
  { count: 180, speed: 0.08, size: [0.5, 1.2], alpha: [0.3, 0.6] },
  { count: 100, speed: 0.2, size: [1.0, 2.0], alpha: [0.5, 0.8] },
  { count: 40, speed: 0.45, size: [1.5, 3.0], alpha: [0.7, 1.0] },
];

const STAR_COLORS = ['#ffffff', '#cce0ff', '#ffd9b3', '#d4b8ff', '#b8ffe0'];
const BACKGROUND = '#05060f';

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

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export type Starfield = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  destroy: () => void;
};

/**
 * Cria a engine de animação do fundo estelar sobre um canvas.
 * Desenha em pixels CSS (com correção de devicePixelRatio para telas retina)
 * e expõe controle de ciclo de vida desacoplado do React.
 */
export function createStarfield(canvas: HTMLCanvasElement): Starfield {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const noop = () => {};
    return { start: noop, stop: noop, resize: noop, destroy: noop };
  }

  const context: CanvasRenderingContext2D = ctx;

  let width = 0;
  let height = 0;
  let stars: Star[] = [];
  const shooters: Shooter[] = [];
  let lastShot = 0;
  let animId = 0;

  function createStars() {
    stars = [];

    for (const { count, speed, size, alpha } of LAYERS) {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: rand(0, width),
          y: rand(0, height),
          size: rand(...size),
          speed,
          alpha: rand(...alpha),
          baseAlpha: rand(...alpha),
          twinkleSpeed: rand(0.005, 0.025),
          twinklePhase: rand(0, Math.PI * 2),
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
    }
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;

    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    // desenha em coordenadas CSS; o dpr cuida da nitidez em retina
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    createStars();
  }

  function drawNebulas() {
    const g1 = context.createRadialGradient(
      width * 0.3,
      height * 0.4,
      0,
      width * 0.3,
      height * 0.4,
      width * 0.55,
    );
    g1.addColorStop(0, 'rgba(60,30,120,0.18)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = g1;
    context.fillRect(0, 0, width, height);

    const g2 = context.createRadialGradient(
      width * 0.75,
      height * 0.6,
      0,
      width * 0.75,
      height * 0.6,
      width * 0.4,
    );
    g2.addColorStop(0, 'rgba(20,60,100,0.14)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = g2;
    context.fillRect(0, 0, width, height);
  }

  function drawStars() {
    for (const s of stars) {
      s.y += s.speed;

      if (s.y > height + s.size) {
        s.y = -s.size;
        s.x = rand(0, width);
      }

      s.twinklePhase += s.twinkleSpeed;
      s.alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

      context.save();
      context.globalAlpha = s.alpha;
      context.fillStyle = s.color;
      context.shadowColor = s.color;
      context.shadowBlur = s.size * 2.5;
      context.beginPath();
      context.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  function spawnShooter() {
    shooters.push({
      x: rand(width * 0.1, width * 0.9),
      y: rand(0, height * 0.4),
      len: rand(80, 180),
      speed: rand(12, 22),
      angle: rand(0.3, 0.7),
      alpha: 1,
      life: 1,
    });
  }

  function drawShooters(ts: number) {
    if (ts - lastShot > rand(1800, 4000)) {
      spawnShooter();
      lastShot = ts;
    }

    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= 0.035;

      if (s.life <= 0 || s.x > width + 200 || s.y > height + 200) {
        shooters.splice(i, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.len * s.life;
      const tailY = s.y - Math.sin(s.angle) * s.len * s.life;
      const grad = context.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, `rgba(200,220,255,${s.life * 0.95})`);

      context.save();
      context.strokeStyle = grad;
      context.lineWidth = 1.5 * s.life;
      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(s.x, s.y);
      context.stroke();
      context.restore();
    }
  }

  function draw(ts: number) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = BACKGROUND;
    context.fillRect(0, 0, width, height);

    drawNebulas();
    drawStars();
    drawShooters(ts);

    animId = requestAnimationFrame(draw);
  }

  function start() {
    if (!animId) animId = requestAnimationFrame(draw);
  }

  function stop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = 0;
    }
  }

  function destroy() {
    stop();
  }

  resize();

  return { start, stop, resize, destroy };
}
