'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useAnimation,
  Variants,
  useReducedMotion,
  Transition,
  Target
} from 'framer-motion';

type AnimationKey =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'rotate-fade'
  | 'flip'
  | 'skew-up';

type Props = React.PropsWithChildren<{
  animation?: AnimationKey;
  duration?: number;
  delay?: number;
  intensity?: number;
  offset?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  direction?: 'ltr' | 'rtl';
}>;

/**
 * Base variant resolvers — return only a Target (no transition).
 * Use concrete types from framer-motion so returned objects match expectations.
 */
const BASE_VARIANTS: Record<
  AnimationKey,
  { hidden: (custom?: number) => Target; visible: (custom?: number) => Target }
> = {
  'fade-up': {
    hidden: (custom = 0) => ({ opacity: 0, y: 120 * custom, scale: 0.99 }),
    visible: () => ({ opacity: 1, y: 0, scale: 1 })
  },
  'fade-down': {
    hidden: (custom = 0) => ({ opacity: 0, y: -120 * custom, scale: 0.99 }),
    visible: () => ({ opacity: 1, y: 0, scale: 1 })
  },
  'fade-left': {
    hidden: () => ({ opacity: 0, x: -140, rotateZ: -2 }),
    visible: () => ({ opacity: 1, x: 0, rotateZ: 0 })
  },
  'fade-right': {
    hidden: () => ({ opacity: 0, x: 140, rotateZ: 2 }),
    visible: () => ({ opacity: 1, x: 0, rotateZ: 0 })
  },
  'zoom-in': {
    hidden: () => ({ opacity: 0, scale: 0.8, rotate: -4 }),
    visible: () => ({ opacity: 1, scale: 1, rotate: 0 })
  },
  'zoom-out': {
    hidden: () => ({ opacity: 0, scale: 1.1, rotate: 3 }),
    visible: () => ({ opacity: 1, scale: 1, rotate: 0 })
  },
  'rotate-fade': {
    hidden: () => ({ opacity: 0, rotate: -18, scale: 0.92 }),
    visible: () => ({ opacity: 1, rotate: 0, scale: 1 })
  },
  flip: {
    hidden: () => ({ opacity: 0, rotateY: 90 }),
    visible: () => ({ opacity: 1, rotateY: 0 })
  },
  'skew-up': {
    hidden: () => ({ opacity: 0, y: 40, skewY: 8 }),
    visible: () => ({ opacity: 1, y: 0, skewY: 0 })
  }
};

/**
 * Build Variants from the base variant targets while applying intensity and RTL flipping.
 * Ensure returned objects are valid `Target` objects (no `undefined` property values).
 */
function makeVariants(animation: AnimationKey, intensity: number, direction: 'ltr' | 'rtl'): Variants {
  
  const base = BASE_VARIANTS[animation];

  const scaleNumber = (n: number) => n * Math.max(1, intensity);

  const toTarget = (src: Target, applyScale = true): Target => {
    // Build in a plain indexable record to avoid TS indexing issues, then cast to Target
    const outRecord: Record<string, unknown> = {};

    Object.entries(src).forEach(([k, v]) => {

      if (v === undefined) return; // skip undefined values

      let value: unknown = v;

      // RTL adjustments
      if (direction === 'rtl') {
        if (k === 'x' && typeof v === 'number') {
          value = -Math.abs(v as number);
        } else if (k === 'left' && typeof v === 'number') {
          value = -Math.abs(v as number);
        } else if (k === 'rotateZ' && typeof v === 'number') {
          value = -(v as number);
        }
      }

      // Scale numeric transform values (but not opacity)
      if (applyScale && typeof value === 'number' && k !== 'opacity') {
        value = scaleNumber(value as number);
      }

      outRecord[k] = value;
    });

    // Cast at the boundary to framer-motion's Target
    return outRecord as Target;
  };

  const variants: Variants = {
    hidden: (custom = 0) => {
      const src = base.hidden ? base.hidden(custom) : {};
      return toTarget(src, true);
    },

    visible: (custom = 0) => {
      const src = base.visible ? base.visible(custom) : {};
      return toTarget(src, false);
    }
  };

  return variants;
}

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  duration = 0.6,
  delay = 0.08,
  intensity = 1,
  offset = 120,
  once = false,
  threshold = 0.1,
  className,
  direction = 'ltr'
}: Props) {

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Hooks must run unconditionally; do an early return inside effect for reduced motion.
  useEffect(() => {

    if (prefersReduced) return;

    let didAnimate = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          if (once && didAnimate) return;
          didAnimate = true;
          controls.start('visible').catch(() => {});
          if (once) observer.disconnect();
        } else {
          if (!once) controls.start('hidden').catch(() => {});
        }
      },
      { threshold, rootMargin: `0px 0px -${offset}px 0px` }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, offset, once, threshold, prefersReduced]);

  // If user prefers reduced motion, render children plainly.
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const items = React.Children.toArray(children);
  const variants = makeVariants(animation, intensity, direction);

  // Use framer-motion's Transition type — this is what the `transition` prop expects.
  const commonTransition = (index: number): Transition => ({
    delay: delay + index * Math.max(0.06, intensity * 0.06),
    type: 'spring',
    damping: 18 - Math.min(8, intensity * 3),
    stiffness: 80 + (intensity - 1) * 40,
    mass: 0.8,
    duration: Math.max(0.3, duration)
  });

  if (items.length === 1) {
    return (
      <>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          custom={0}
          transition={commonTransition(0)}
          className={className}
          style={{ willChange: 'transform, opacity' }}
        >
          {items[0]}
        </motion.div>
      </>
    );
  }

  return (
    <>
      <div ref={ref} className={className} style={{ display: 'contents' }}>
        {items.map((child, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate={controls}
            variants={variants}
            custom={i}
            transition={commonTransition(i)}
            style={{ willChange: 'transform, opacity' }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </>
  );
}
