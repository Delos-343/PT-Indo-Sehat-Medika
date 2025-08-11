/* Carousel.tsx */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CAROUSEL_IMAGES } from '../data/slideCards';
import {
  motion,
  animate as fmAnimate,
  useMotionValue,
  useTransform,
  Transition,
  MotionValue,
  Variants,
} from 'framer-motion';
import { CarouselSlide } from '../../molecules';
import { CarouselArrow, CarouselDot } from '../../atoms';

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 12 }, // slide up into place
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, // smooth, buttery
  },
};

export const Carousel: React.FC = () => {

  const slides = CAROUSEL_IMAGES;
  const N = slides.length;

  const [index, setIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Drag state
  const dragStartX = useRef<number | null>(null);
  const dragDx = useRef<number>(0);

  // Interaction / visibility / autoplay refs
  const lastInteractionRef = useRef<number>(Date.now());
  const isDocumentVisibleRef = useRef<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  // Prefers reduced motion
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  // IntersectionObserver state: only animate / autoplay when in view
  const [isInView, setIsInView] = useState<boolean>(false);
  const hasPlayedRef = useRef<boolean>(false);

  // CONFIG knobs (tweak to taste)
  const AUTOPLAY_INTERVAL = 5000; // ms
  const IDLE_THRESHOLD = 2500; // ms
  const IN_VIEW_THRESHOLD = 0.35;
  const IN_VIEW_ROOT_MARGIN = '0px 0px -10% 0px';
  const PLAY_ONCE = true;

  // Animation tuning (slower, smoother)
  const ANIMATION_DURATION = 1.0; // seconds for tween when not reduced-motion
  // A gentle cubic-bezier easing — slower, smooth arrival
  const ANIMATION_EASE: [number, number, number, number] = [0.22, 0.12, 0.12, 0.98];

  // measure container width
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

  // Keyboard navigation
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

  // Pointer drag -> swipe behavior
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

  // Signed (circular) distance helper — same semantics as your original helper
  const signedDistance = (i: number, center: number) => {
    let d = i - center;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  // visibility change (tab hidden)
  useEffect(() => {
    const onVisibility = () => {
      isDocumentVisibleRef.current = !document.hidden;
      lastInteractionRef.current = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // prefers-reduced-motion
  useEffect(() => {
    try {
      const mq: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      let legacyListener:
        | ((this: MediaQueryList, ev: MediaQueryListEvent | MediaQueryList) => void)
        | undefined;
      legacyListener = function (this: MediaQueryList, ev: MediaQueryListEvent | MediaQueryList) {
        const matches = (ev as any)?.matches ?? mq.matches;
        setReduceMotion(Boolean(matches));
      };
      setReduceMotion(mq.matches);
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      else if (typeof mq.addListener === 'function' && legacyListener) (mq as any).addListener(legacyListener);
      return () => {
        if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handler);
        else if (typeof mq.removeListener === 'function' && legacyListener) (mq as any).removeListener(legacyListener);
      };
    } catch {
      setReduceMotion(false);
      return;
    }
  }, []);

  // IntersectionObserver -> set isInView (PLAY_ONCE supported)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
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
          // do not set false after play once
        } else {
          setIsInView(currentlyInView);
        }
      },
      { root: null, rootMargin: IN_VIEW_ROOT_MARGIN, threshold: [IN_VIEW_THRESHOLD] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [IN_VIEW_ROOT_MARGIN, IN_VIEW_THRESHOLD, PLAY_ONCE]);

  // Autoplay (only when in view)
  useEffect(() => {
    if (N <= 1) return;
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

  // Transition used as fallback if needed anywhere else
  const transition: Transition = reduceMotion
    ? { duration: 0.15 }
    : ({ type: 'tween', duration: ANIMATION_DURATION } as Transition);

  // --------------------
  // Core refactor: single motion value drives the "center" (can be fractional while animating).
  // Each slide computes its transform values from that shared motion value using useTransform,
  // which yields very smooth interpolations and much nicer visual flow.
  // --------------------

  // motion value representing center index (will be animated to `index` whenever index changes)
  const center: MotionValue<number> = useMotionValue(index);

  // animate center when index updates — uses a gentle tween
  useEffect(() => {
    if (reduceMotion) {
      // jump instantly (or nearly instantly) when reduced motion is requested
      fmAnimate(center, index, { duration: 0.12 });
      return;
    }

    // animate with a slow gentle easing for human-friendly movement
    fmAnimate(center, index, {
      type: 'tween',
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduceMotion]); // center intentionally omitted from deps; we want to animate the same ref

  // stable key helper (keeps original)
  const getStableKey = (slide: any, i: number) => {
    const base = slide?.id ?? slide?.slug ?? slide?.alt ?? i;
    return `carousel-${String(base)}`;
  };

  // Dev-time key diagnostics (keeps original)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const keys = slides.map((s, i) => getStableKey(s, i));
    const duplicates = keys.filter((k, idx) => keys.indexOf(k) !== idx);
    if (duplicates.length) {
      // eslint-disable-next-line no-console
      console.warn('[Carousel] duplicate keys detected:', duplicates, 'Slides keys:', keys);
    }
  }, [slides]);

  // offscreen fallback so the reveal doesn't animate if the section is not in view
  const offscreenFallback = { opacity: 0, y: 30 };

  return (
    <>
      <section aria-label="What We Sell" className="w-full py-6 mb-12 md:mb-0">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingVariants}
            style={{ willChange: 'transform, opacity' }} // hint browser to optimize
          >
            What We <span className="text-[var(--color-primary)]">Sell</span>
          </motion.h2>

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
            {slides.map((slide, i) => {
              
              const spacing = containerWidth ? Math.min(0.38 * containerWidth, 340) : 220;
              const d = useTransform(center, (c) => signedDistance(i, c));
              
              const x = useTransform(d, (dd) => dd * spacing);
              const y = useTransform(d, (dd) => Math.abs(dd) * 8);

              const scale = useTransform(d, (dd) => Math.max(0.68, 1 - Math.abs(dd) * 0.12));
              const opacity = useTransform(d, (dd) => Math.max(0.18, 1 - Math.abs(dd) * 0.28));
              const blur = useTransform(d, (dd) => `blur(${Math.min(6, Math.abs(dd) * 2)}px)`);

              const isPointerActive = i === index;
              const stableKey = getStableKey(slide, i);

              return (
                <motion.div
                  key={stableKey}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${N}`}
                  initial={offscreenFallback}
                  animate={isInView ? { opacity: 1 } : offscreenFallback}
                  transition={transition}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 'clamp(360px, 40vw, 900px)',
                    zIndex: 200 - Math.abs(i - index),
                    pointerEvents: isPointerActive ? 'auto' : 'none',
                    cursor: isPointerActive ? 'auto' : 'default',
                    willChange: 'transform, opacity, filter',
                    x,
                    y,
                    scale,
                    opacity,
                    filter: blur,
                  }}
                  transformTemplate={(transformProps: any, generatedTransform: string) =>
                    `translate(-50%, -50%) ${generatedTransform}`
                  }
                >
                  <CarouselSlide
                    image={slide}
                    style={{ opacity: undefined }}
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
              {slides.map((slide, i) => (
                <CarouselDot
                  key={`dot-${getStableKey(slide, i)}`}
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
