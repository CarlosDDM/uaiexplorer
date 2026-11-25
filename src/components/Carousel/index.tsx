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
  /** Largura de cada slide (ex.: 'basis-full md:basis-1/3'). Padrão: largura do conteúdo. */
  slideClassName?: string;
};

export function Carousel({
  children,
  className,
  slideClassName = 'basis-auto',
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
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
      {/* viewport — select-none evita selecionar texto ao arrastar */}
      <div className='overflow-hidden select-none' ref={emblaRef}>
        {/* container — o espaçamento vem do pl dos slides (padrão do embla),
            assim a largura em % de cada slide já desconta o gap */}
        <div className='-ml-6 flex py-6'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={clsx(
                'flex min-w-0 shrink-0 grow-0 justify-center pl-6',
                slideClassName,
              )}
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
                  'h-2 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none',
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
        'border border-solid border-border-card bg-background-card/85',
        'text-button-default transition duration-300 ease-out motion-reduce:transition-none',
        'hover:border-border-card-hover hover:shadow-md hover:shadow-shadow-card-hover',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-card',
        '[&>svg]:h-5 [&>svg]:w-5',
      )}
    >
      <Icon />
    </button>
  );
}
