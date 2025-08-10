'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CAROUSEL_IMAGES } from './data/slideCards';
import { CarouselSlide } from '../molecules/carousel/CarouselSlide';
import { CarouselArrow } from '../atoms/carousel/CarouselArrow';
import { CarouselDot } from '../atoms/carousel/CarouselDot';

const CLAMP = (v: number, a = -5, b = 5) => Math.max(a, Math.min(b, v));

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

      el.setPointerCapture(ev.pointerId);
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (dragStartX.current == null) return;
      dragDx.current = ev.clientX - dragStartX.current;
      // we could use dragDx to update transforms for live dragging (not implemented to keep CSS transitions crisp)
    };

    const onPointerUp = (ev: PointerEvent) => {

      if (dragStartX.current == null) return;

      const dx = ev.clientX - (dragStartX.current ?? 0);
      const threshold = Math.min(120, (window.innerWidth / 8)); // swipe threshold

      if (dx > threshold) prev();
      else if (dx < -threshold) next();

      dragStartX.current = null;
      dragDx.current = 0;

      try { el.releasePointerCapture(ev.pointerId); } catch {}
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

    // wrap to [-N/2, N/2]
    if (d > N / 2) d -= N;

    if (d < -N / 2) d += N;

    return d;
  };

  return (
  <>
    <section aria-label="What We Sell" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] m-0 sm:mb-24 text-center md:text-left">
          What We <span className="text-[var(--color-primary)]"> Sell </span>
        </h2>
        {/* Carousel viewport */}
        <div
          ref={containerRef}
          className="relative w-full h-[46vh] md:h-[50vh] lg:h-[56vh] select-none"
          role="region"
          aria-roledescription="carousel"
        >
          {/* Slides: absolutely positioned; each slide gets transform/opacity/zIndex set by its offset */}
          {slides.map((slide, i) => {

            const d = signedDistance(i, index); // -2..2 etc

            // visual parameters — tweak multipliers for your exact Figma look
            const baseX = 0; // center at 0
            const spacing = 220; // px horizontal spacing per offset

            const translateX = baseX + d * spacing;
            const scale = Math.max(0.68, 1 - Math.abs(d) * 0.12);

            const opacity = Math.max(0.18, 1 - Math.abs(d) * 0.28);
            const zIndex = 200 - Math.abs(d);
            const blur = Math.min(6, Math.abs(d) * 2);

            const style: React.CSSProperties = {
              transform: `translateX(${translateX}px) translateY(${Math.abs(d) * 8}px) scale(${scale})`,
              opacity,
              zIndex,
              filter: `blur(${blur}px)`,
              pointerEvents: d === 0 ? 'auto' : 'none', // only active slide receives pointer events
            };

            return (
              <CarouselSlide
                key={slide.id}
                image={slide}
                style={style}
                className="" // additional classes if needed
                label={`Slide ${i + 1} of ${N} - ${slide.alt}`}
              />
            );
          })}

          {/* Left & Right arrows (centered under) */}
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-6">
            <CarouselArrow dir="left" onClick={prev} />
            {/* pagination dots */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <CarouselDot key={i} index={i} active={i === index} onClick={(n) => setIndex(n)} />
              ))}
            </div>
            <CarouselArrow dir="right" onClick={next} />
          </div>
        </div>
      </div>
    </section>
  </>
  );
};
