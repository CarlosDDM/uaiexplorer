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

    // no mobile, rolar mostra/esconde a barra de endereço e dispara "resize"
    // só de altura — só recriamos o starfield quando a largura muda de fato.
    let lastWidth = canvas.offsetWidth;
    const handleResize = () => {
      const width = canvas.offsetWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      starfield.resize();
      starfield.renderOnce();
      syncPlayback();
    };
    window.addEventListener('resize', handleResize);

    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      motionQuery.removeEventListener('change', syncPlayback);
      window.removeEventListener('resize', handleResize);
      starfield.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className='relative w-full overflow-hidden'>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 block h-full w-full'
        style={{ background: '#05060f' }}
      />

      {/* fades estáticos nas bordas para substituir mask-image sobre o canvas animado */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background-black-default to-transparent'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background-black-default to-transparent'
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
  );
}
