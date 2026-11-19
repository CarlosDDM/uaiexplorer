'use client';
import { useEffect, useRef } from 'react';
import { createStarfield } from './starfield';

type UniverseAnimationProps = {
  children?: React.ReactNode;
};

export function UniverseAnimation({ children }: UniverseAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const starfield = createStarfield(canvas);
    starfield.start();

    // no mobile, rolar mostra/esconde a barra de endereço e dispara "resize"
    // só de altura — só recriamos o starfield quando a largura muda de fato.
    let lastWidth = canvas.offsetWidth;
    const handleResize = () => {
      const width = canvas.offsetWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      starfield.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      starfield.destroy();
    };
  }, []);

  return (
    <div className='relative w-full'>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 block h-full w-full rounded [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]'
        style={{ background: '#05060f' }}
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
