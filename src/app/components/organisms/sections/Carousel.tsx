'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CAROUSEL_IMAGES } from '../data/slideCards';
import { CarouselSlide } from '../../molecules/carousel/CarouselSlide';
import { CarouselArrow } from '../../atoms/carousel/CarouselArrow';
import { CarouselDot } from '../../atoms/carousel/CarouselDot';

export const Carousel: React.FC = () => {
  const slides = CAROUSEL_IMAGES;
  const N = slides.length;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drag/swipe state
  const dragStartX = useRef<number | null>(null);
  const dragDx = useRef(0);

  // next / prev
  const next = useCallback(() => setIndex((i) => (i + 1) % N), [N]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + N) % N), [N]);

  // keyboard left/right
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {

      if (e.key === 'ArrowLeft') prev();

      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);

  }, [next, prev]);

  // pointer swipe handlers
  useEffect(() => {

    const el = containerRef.current;
    
    if (!el) return;

    const onPointerDown = (ev: PointerEvent) => {

      dragStartX.current = ev.clientX;
      dragDx.current = 0;

      try {
        el.setPointerCapture(ev.pointerId);
      } catch {}
    };

    const onPointerMove = (ev: PointerEvent) => {

      if (dragStartX.current == null) return;

      dragDx.current = ev.clientX - dragStartX.current;
    };

    const onPointerUp = (ev: PointerEvent) => {

      if (dragStartX.current == null) return;

      const dx = ev.clientX - (dragStartX.current ?? 0);
      const threshold = Math.min(120, window.innerWidth / 8);

      if (dx > threshold) prev();
      else if (dx < -threshold) next();

      dragStartX.current = null;
      dragDx.current = 0;

      try {
        el.releasePointerCapture(ev.pointerId);
      } catch {}
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    return () => {

      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [next, prev]);

  // helper: signed distance from active (shortest circle distance)
  const signedDistance = (i: number, center: number) => {

    let d = i - center;

    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;

    return d;
  };

  return (
    <>
      <section aria-label="What We Sell" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] m-0 sm:mb-24 text-center md:text-right">
            What We <span className="text-[var(--color-primary)]"> Sell </span>
          </h2>

          {/* Carousel viewport */}
          <div
            ref={containerRef}
            className="relative w-full h-[36vh] md:h-[64vh] select-none overflow-hidden"
            role="region"
            aria-roledescription="carousel"
          >
            {/* Slides: absolutely positioned */}
            {slides.map((slide, i) => {

              const d = signedDistance(i, index);

              // tweak multipliers for the Figma look
              const spacing = 220; // px horizontal spacing between offsets
              const translateX = d * spacing;
              const scale = Math.max(0.68, 1 - Math.abs(d) * 0.12);
              const opacity = Math.max(0.18, 1 - Math.abs(d) * 0.28);
              const zIndex = 200 - Math.abs(d);
              const blur = Math.min(6, Math.abs(d) * 2);

              const style: React.CSSProperties = {

                transform: `translateX(${translateX}px) translateY(${Math.abs(d) * 8}px) scale(${scale})`,
                opacity,
                zIndex,
                filter: `blur(${blur}px)`,
                pointerEvents: d === 0 ? 'auto' : 'none',
                cursor: d === 0 ? 'auto' : 'default',
              };

              return (
                <CarouselSlide
                  key={slide.id}
                  image={slide}
                  style={style}
                  label={`Slide ${i + 1} of ${N} - ${slide.alt}`}
                />
              );
            })}
          </div>
          {/* CONTROLS: moved outside the viewport (below carousel) */}
          <div className="mt-6 flex justify-center items-center gap-6">
            <CarouselArrow dir="left" onClick={prev} />
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <CarouselDot key={i} index={i} active={i === index} onClick={(n) => setIndex(n)} />
              ))}
            </div>
            <CarouselArrow dir="right" onClick={next} />
          </div>
        </div>
      </section>
    </>
  );
};
