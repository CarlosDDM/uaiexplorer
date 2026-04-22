'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

type CarouselProps = {
  children: React.ReactNode;
};

export function Carousel({ children }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <div className='overflow-hidden w-full max-w-7xl mx-auto'>
      <div ref={emblaRef} className='w-full'>
        <div className='flex gap-4 px-4'>{children}</div>
      </div>
    </div>
  );
}
