'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants, useReducedMotion } from 'framer-motion';

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

const BASE_VARIANTS: Record<AnimationKey, Variants> = {
  'fade-up': {
    hidden: (i = 0) => ({ opacity: 0, y: 120 * i, scale: 0.99 }),
    visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1 })
  },
  'fade-down': {
    hidden: (i = 0) => ({ opacity: 0, y: -120 * i, scale: 0.99 }),
    visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1 })
  },
  'fade-left': {
    hidden: (_i = 1) => ({ opacity: 0, x: -140, rotateZ: -2 }),
    visible: () => ({ opacity: 1, x: 0, rotateZ: 0 })
  },
  'fade-right': {
    hidden: (_i = 1) => ({ opacity: 0, x: 140, rotateZ: 2 }),
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

function makeVariants(animation: AnimationKey, intensity: number, direction: 'ltr' | 'rtl') {

  const base = BASE_VARIANTS[animation];

  const variants: Variants = {
    hidden: (custom = 0) => {
      const v = (base.hidden as any)(custom);
      if (direction === 'rtl') {
        if (v && typeof v.x === 'number') v.x = Math.abs(v.x) * -1;
        if (v && typeof v.rotateZ === 'number') v.rotateZ = -v.rotateZ;
      }
      Object.keys(v || {}).forEach((k) => {
        if (typeof (v as any)[k] === 'number' && k !== 'opacity') {
          (v as any)[k] = (v as any)[k] * Math.max(1, intensity);
        }
      });
      return v;
    },
    visible: (custom = 0) => {
      const v = (base.visible as any)(custom);
      return v;
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

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  useEffect(() => {

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
  }, [controls, offset, once, threshold]);

  const items = React.Children.toArray(children);
  const variants = makeVariants(animation, intensity, direction);

  const commonTransition = (index: number) => ({
    delay: delay + index * Math.max(0.06, intensity * 0.06),
    type: 'spring' as const,
    damping: 18 - Math.min(8, intensity * 3),
    stiffness: 80 + (intensity - 1) * 40,
    mass: 0.8,
    duration: Math.max(0.3, duration)
  });

  if (items.length === 1) {
    return (
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
