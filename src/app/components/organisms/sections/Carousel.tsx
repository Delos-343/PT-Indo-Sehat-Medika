'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CAROUSEL_IMAGES } from '../data/slideCards';
import { motion, Transition } from 'framer-motion';
import { CarouselSlide } from '../../molecules';
import { CarouselArrow, CarouselDot } from '../../atoms';

export const Carousel: React.FC = () => {
  
  const slides = CAROUSEL_IMAGES;
  const N = slides.length;

  const [index, setIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);

  const dragStartX = useRef<number | null>(null);
  const dragDx = useRef<number>(0);

  const lastInteractionRef = useRef<number>(Date.now());
  const isDocumentVisibleRef = useRef<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  // Respect user's reduced-motion preference and use it to disable/shorten animations when requested.
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  // IntersectionObserver state: only animate / autoplay when this section is in view
  const [isInView, setIsInView] = useState<boolean>(false);
  const hasPlayedRef = useRef<boolean>(false); // for PLAY_ONCE behavior

  // CONFIG
  const AUTOPLAY_INTERVAL = 5000; // ms
  const IDLE_THRESHOLD = 2500; // ms
  const IN_VIEW_THRESHOLD = 0.35; // fraction of element visible to consider "in view"
  const IN_VIEW_ROOT_MARGIN = '0px 0px -10% 0px'; // tweak to trigger earlier/later
  const PLAY_ONCE = true; // set true to play reveal only once per page load

  useEffect(() => {
    const el = containerRef.current;
    const measure = () => setContainerWidth(el?.offsetWidth ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    if (el) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % N), [N]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + N) % N), [N]);

  const markInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft') {
        markInteraction();
        prev();
      }
      if (e.key === 'ArrowRight') {
        markInteraction();
        next();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, markInteraction]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (ev: PointerEvent) => {
      markInteraction();
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
      const threshold = Math.min(120, (containerWidth || window.innerWidth) / 8);
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
  }, [next, prev, markInteraction, containerWidth]);

  const signedDistance = (i: number, center: number) => {
    let d = i - center;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  useEffect(() => {
    const onVisibility = () => {
      isDocumentVisibleRef.current = !document.hidden;
      lastInteractionRef.current = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    try {
      const mq: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');

      // Modern API handler receives MediaQueryListEvent
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);

      // Legacy listener: some older browsers invoke addListener/removeListener with a MediaQueryList
      // We'll create a function that accepts either shape and normalize it. We cast when attaching
      // because older DOM typings are incompatible with the newer event signature.
      const legacyListener = function (this: MediaQueryList, ev: MediaQueryListEvent | MediaQueryList) {
        const matches = ('matches' in ev ? ev.matches : mq.matches);
        setReduceMotion(Boolean(matches));
      };

      // set initial value
      setReduceMotion(mq.matches);

      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      
      else if (typeof mq.addListener === 'function' && legacyListener) {
        // cast to any to satisfy legacy DOM typings
        (mq as unknown as { addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void }).addListener(legacyListener);
      }

      return () => {
        if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handler);
        else if (typeof mq.removeListener === 'function' && legacyListener) {
          (mq as unknown as { addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void }).addListener(legacyListener);
        }
      };
    } catch {
      setReduceMotion(false);
      return;
    }
  }, []);

  // IntersectionObserver -> sets isInView
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // assume in view if observer not available
      setIsInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const currentlyInView = e.isIntersecting && e.intersectionRatio >= IN_VIEW_THRESHOLD;

        if (PLAY_ONCE) {
          if (currentlyInView && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            setIsInView(true);
          }
          // once played, we intentionally do not set isInView back to false
        } else {
          setIsInView(currentlyInView);
        }
      },
      { root: null, rootMargin: IN_VIEW_ROOT_MARGIN, threshold: [IN_VIEW_THRESHOLD] }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [IN_VIEW_ROOT_MARGIN, IN_VIEW_THRESHOLD, PLAY_ONCE]);

  // Autoplay: only runs while the carousel is in view
  useEffect(() => {
    if (N <= 1) return;

    // don't start autoplay unless in view
    if (!isInView) return;

    const tick = () => {
      const now = Date.now();
      const idle = now - lastInteractionRef.current >= IDLE_THRESHOLD;
      const visible = isDocumentVisibleRef.current;
      if (idle && visible) {
        setIndex((i) => (i + 1) % N);
      }
    };

    intervalRef.current = window.setInterval(tick, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [N, isInView]);

  useEffect(() => {
    if (index >= slides.length) setIndex(slides.length - 1);
  }, [slides.length, index]);

  // If reduceMotion is requested, disable spring animation and use instant transitions.
  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : ({ type: 'spring', stiffness: 120, damping: 20 } as Transition);

  // Offscreen fallback state used so the carousel doesn't animate into place until it's in view
  const offscreenFallback = { opacity: 0, y: 30 };

  return (
    <>
      <section aria-label="What We Sell" className="w-full py-6 mb-12 md:mb-0">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] m-0 sm:mb-24 text-center md:text-left">
            What We <span className="text-[var(--color-primary)]"> Sell </span>
          </h2>
          {/* Carousel viewport */}
          <div
            ref={containerRef}
            className="relative w-full h-[36vh] lg:h-[48vh] select-none overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            onMouseEnter={markInteraction}
            onMouseMove={markInteraction}
            onTouchStart={markInteraction}
            onFocusCapture={markInteraction}
          >
            {/* Slides: absolutely positioned, each wrapped in motion.div for smooth interpolation */}
            {slides.map((slide, i) => {
              const d = signedDistance(i, index);

              const spacing = containerWidth ? Math.min(0.38 * containerWidth, 340) : 220;

              const translateX = d * spacing;
              const translateY = Math.abs(d) * 8;
              const scale = Math.max(0.68, 1 - Math.abs(d) * 0.12);
              const opacity = Math.max(0.18, 1 - Math.abs(d) * 0.28);
              const zIndex = 200 - Math.abs(d);
              const blur = Math.min(6, Math.abs(d) * 2);

              const target = {
                x: translateX,
                y: translateY,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
              };

              return (
                <motion.div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${N}`}
                  initial={offscreenFallback}
                  animate={isInView ? target : offscreenFallback}
                  transition={transition}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 'clamp(360px, 40vw, 900px)',
                    zIndex,
                    pointerEvents: d === 0 ? 'auto' : 'none',
                    cursor: d === 0 ? 'auto' : 'default',
                    willChange: 'transform, opacity, filter',
                  }}
                  transformTemplate={(transformProps, generatedTransform) => {
                    return `translate(-50%, -50%) ${generatedTransform}`;
                  }}
                  >
                  <CarouselSlide
                    key={slide.id}
                    image={slide}
                    style={{ opacity, pointerEvents: d === 0 ? 'auto' : 'none' }}
                    label={`Slide ${i + 1} of ${N} - ${slide.alt}`}
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-center items-center gap-6">
            <CarouselArrow
              dir="left"
              onClick={() => {
                markInteraction();
                prev();
              }}
            />
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <CarouselDot
                  key={i}
                  index={i}
                  active={i === index}
                  onClick={(n) => {
                    markInteraction();
                    setIndex(n);
                  }}
                />
              ))}
            </div>
            <CarouselArrow
              dir="right"
              onClick={() => {
                markInteraction();
                next();
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};
