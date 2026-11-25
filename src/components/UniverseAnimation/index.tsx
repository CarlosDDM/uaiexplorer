'use client';
import { useEffect, useRef } from 'react';
import { createStarfield } from './starfield';

type UniverseAnimationProps = {
  children?: React.ReactNode;
};

export function UniverseAnimation({ children }: UniverseAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const starfield = createStarfield(canvas);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isInViewport = false;

    const syncPlayback = () => {
      if (motionQuery.matches) {
        starfield.stop();
        starfield.renderOnce();
        return;
      }

      if (isInViewport && !document.hidden) {
        starfield.start();
      } else {
        starfield.stop();
      }
    };

    starfield.renderOnce();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? false;
        syncPlayback();
      },
      { rootMargin: '100px 0px', threshold: 0 },
    );
    observer.observe(container);

    document.addEventListener('visibilitychange', syncPlayback);
    motionQuery.addEventListener('change', syncPlayback);

    let lastWidth = container.offsetWidth;
    let lastHeight = container.offsetHeight;
    let resizeRafId = 0;

    // throttle em rAF para não recalcular o canvas a cada pixel de resize
    // e ignora pequenas variações de altura da barra de endereço no mobile.
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId) return;
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = 0;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        if (width === lastWidth && Math.abs(height - lastHeight) < 40) return;
        lastWidth = width;
        lastHeight = height;
        starfield.resize();
        starfield.renderOnce();
        syncPlayback();
      });
    });
    resizeObserver.observe(container);

    syncPlayback();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      document.removeEventListener('visibilitychange', syncPlayback);
      motionQuery.removeEventListener('change', syncPlayback);
      starfield.destroy();
    };
  }, []);

  return (
    <div className='w-full'>
      <div ref={containerRef} className='relative w-full overflow-hidden'>
        <canvas
          ref={canvasRef}
          className='absolute inset-0 block h-full w-full'
          style={{ background: '#05060f' }}
        />

        {/* fades estáticos nas bordas para substituir mask-image sobre o canvas animado */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#05060f] to-transparent md:h-32'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#05060f] to-transparent md:h-32'
        />

        {/* scrim: escurece as estrelas atrás da coluna de texto */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_30%_50%,rgba(5,6,15,0.85),rgba(5,6,15,0.4)_60%,transparent)]'
        />

        <div className='relative flex flex-col items-center justify-center gap-4 px-4 py-24 md:py-32'>
          {children}
        </div>
      </div>

      {/* mescla o #05060f do universo com o gradiente azul do body na seção abaixo */}
      <div
        aria-hidden
        className='pointer-events-none relative -z-10 -mt-px -mb-24 h-24 w-full bg-linear-to-b from-[#05060f] via-[#05060f]/55 to-transparent md:-mb-36 md:h-36'
      />
    </div>
  );
}
