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

    const handleResize = () => starfield.resize();
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
        className='absolute inset-0 block h-full w-full rounded'
        style={{ background: '#05060f' }}
      />

      <div className='relative flex flex-col items-center justify-center gap-4 px-4 py-20'>
        {children}
      </div>
    </div>
  );
}
