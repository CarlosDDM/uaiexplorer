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

const SPRITE_SIZE = 64;
const SPRITE_CORE_RADIUS = 6;
const FRAME_INTERVAL = 1000 / 30;

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

/**
 * Pré-renderiza um sprite com halo suave para cada cor de estrela.
 * Evita chamar context.shadowBlur centenas de vezes por frame.
 */
function createStarSprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();
  const center = SPRITE_SIZE / 2;

  for (const color of STAR_COLORS) {
    const sprite = document.createElement('canvas');
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;
    const spriteCtx = sprite.getContext('2d');

    if (spriteCtx) {
      spriteCtx.fillStyle = color;
      spriteCtx.shadowColor = color;
      spriteCtx.shadowBlur = SPRITE_CORE_RADIUS * 2.5;
      spriteCtx.beginPath();
      spriteCtx.arc(center, center, SPRITE_CORE_RADIUS, 0, Math.PI * 2);
      spriteCtx.fill();
    }

    sprites.set(color, sprite);
  }

  return sprites;
}

export type Starfield = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  renderOnce: () => void;
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
    return {
      start: noop,
      stop: noop,
      resize: noop,
      renderOnce: noop,
      destroy: noop,
    };
  }

  const context: CanvasRenderingContext2D = ctx;
  const sprites = createStarSprites();
  const bgCanvas = document.createElement('canvas');
  const bgCtx = bgCanvas.getContext('2d');

  let width = 0;
  let height = 0;
  let stars: Star[] = [];
  const shooters: Shooter[] = [];
  let lastShot = 0;
  let nextShotDelay = rand(1800, 4000);
  let lastFrameTime = 0;
  let animId = 0;

  function createStars() {
    stars = [];

    for (const { count, speed, size, alpha } of LAYERS) {
      for (let i = 0; i < count; i++) {
        const baseAlpha = rand(...alpha);
        stars.push({
          x: rand(0, width),
          y: rand(0, height),
          size: rand(...size),
          speed,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: rand(0.005, 0.025),
          twinklePhase: rand(0, Math.PI * 2),
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
    }
  }

  function renderBackground(dpr: number) {
    if (!bgCtx || width === 0 || height === 0) return;

    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bgCtx.fillStyle = BACKGROUND;
    bgCtx.fillRect(0, 0, width, height);

    const g1 = bgCtx.createRadialGradient(
      width * 0.3,
      height * 0.4,
      0,
      width * 0.3,
      height * 0.4,
      width * 0.55,
    );
    g1.addColorStop(0, 'rgba(60,30,120,0.18)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = g1;
    bgCtx.fillRect(0, 0, width, height);

    const g2 = bgCtx.createRadialGradient(
      width * 0.75,
      height * 0.6,
      0,
      width * 0.75,
      height * 0.6,
      width * 0.4,
    );
    g2.addColorStop(0, 'rgba(20,60,100,0.14)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    bgCtx.fillStyle = g2;
    bgCtx.fillRect(0, 0, width, height);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    if (width === 0 || height === 0) {
      canvas.width = 0;
      canvas.height = 0;
      bgCanvas.width = 0;
      bgCanvas.height = 0;
      stars = [];
      return;
    }

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    // desenha em coordenadas CSS; o dpr cuida da nitidez em retina
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;
    renderBackground(dpr);

    createStars();
  }

  function drawBackground() {
    if (bgCanvas.width > 0 && bgCanvas.height > 0) {
      context.drawImage(bgCanvas, 0, 0, width, height);
      return;
    }

    context.fillStyle = BACKGROUND;
    context.fillRect(0, 0, width, height);
  }

  function drawStars(step: number) {
    for (const s of stars) {
      if (step > 0) {
        s.y += s.speed * step;

        if (s.y > height + s.size) {
          s.y = -s.size;
          s.x = rand(0, width);
        }

        s.twinklePhase += s.twinkleSpeed * step;
        s.alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
      }

      const sprite = sprites.get(s.color);
      if (!sprite) continue;

      const drawSize = (SPRITE_SIZE / SPRITE_CORE_RADIUS) * s.size;
      const half = drawSize / 2;

      context.globalAlpha = s.alpha;
      context.drawImage(sprite, s.x - half, s.y - half, drawSize, drawSize);
    }

    context.globalAlpha = 1;
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

  function drawShooters(ts: number, step: number) {
    if (lastShot === 0) {
      lastShot = ts;
    }

    if (ts - lastShot > nextShotDelay) {
      spawnShooter();
      lastShot = ts;
      nextShotDelay = rand(1800, 4000);
    }

    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += Math.cos(s.angle) * s.speed * step;
      s.y += Math.sin(s.angle) * s.speed * step;
      s.life -= 0.035 * step;

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

  function drawFrame(ts: number, step: number) {
    if (width === 0 || height === 0) return;

    drawBackground();
    drawStars(step);
    drawShooters(ts, step);
  }

  function draw(ts: number) {
    if (lastFrameTime !== 0 && ts - lastFrameTime < FRAME_INTERVAL) {
      animId = requestAnimationFrame(draw);
      return;
    }

    const elapsed =
      lastFrameTime === 0 ? FRAME_INTERVAL : Math.min(ts - lastFrameTime, 100);
    lastFrameTime = ts;
    const step = elapsed / (1000 / 60);

    drawFrame(ts, step);
    animId = requestAnimationFrame(draw);
  }

  function renderOnce() {
    if (width === 0 || height === 0) return;

    drawBackground();
    drawStars(0);
  }

  function start() {
    if (!animId) animId = requestAnimationFrame(draw);
  }

  function stop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = 0;
    }
    lastFrameTime = 0;
    lastShot = 0;
  }

  function destroy() {
    stop();
  }

  resize();

  return { start, stop, resize, renderOnce, destroy };
}
