'use client';

import {
  Children,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type CarouselProps = {
  children: ReactNode;
  className?: string;
};

export function Carousel({ children, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    containScroll: 'trimSnaps',
  });

  const slides = Children.toArray(children);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    /* eslint-disable react-hooks/set-state-in-effect -- sincroniza o estado inicial do embla (fonte externa) uma vez na montagem */
    onInit(emblaApi);
    onSelect(emblaApi);
    /* eslint-enable react-hooks/set-state-in-effect */

    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

    return () => {
      emblaApi
        .off('reInit', onInit)
        .off('reInit', onSelect)
        .off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className={clsx('w-full', className)}>
      {/* viewport */}
      <div className='overflow-hidden' ref={emblaRef}>
        {/* container */}
        <div className='flex gap-6 py-2'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='flex min-w-0 flex-[0_0_auto] justify-center'
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* controles — só quando há mais de um snap (algo a rolar) */}
      {scrollSnaps.length > 1 && (
        <div className='mt-8 flex items-center justify-center gap-6'>
          <CarouselButton
            direction='prev'
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          />

          <div className='flex items-center gap-2'>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => scrollTo(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                aria-current={index === selectedIndex}
                className={clsx(
                  'h-2 rounded-full transition-all duration-300',
                  index === selectedIndex
                    ? 'w-6 bg-button-default'
                    : 'w-2 bg-border-card hover:bg-border-card-hover',
                )}
              />
            ))}
          </div>

          <CarouselButton
            direction='next'
            onClick={scrollNext}
            disabled={!canScrollNext}
          />
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? IoChevronBack : IoChevronForward;

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Slide anterior' : 'Próximo slide'}
      className={clsx(
        'grid h-10 w-10 place-content-center rounded-full',
        'border border-solid border-border-card bg-background-card/60 backdrop-blur-sm',
        'text-button-default transition duration-300 ease-out',
        'hover:border-border-card-hover hover:shadow-md hover:shadow-shadow-card-hover',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-card',
        '[&>svg]:h-5 [&>svg]:w-5',
      )}
    >
      <Icon />
    </button>
  );
}
