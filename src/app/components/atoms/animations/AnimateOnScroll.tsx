'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?:
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'zoom-in'
    | 'zoom-out'
    | 'rotate-fade'
    | 'flip'
    | 'skew-up';
  duration?: number;
  offset?: number;
  once?: boolean;
  delay?: number;
}

const animationVariants: Record<string, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 150, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  },
  'fade-down': {
    hidden: { opacity: 0, y: -150, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  },
  'fade-left': {
    hidden: { opacity: 0, x: -180, rotateZ: -2 },
    visible: {
      opacity: 1,
      x: 0,
      rotateZ: 0,
      transition: { type: 'spring', stiffness: 60, damping: 18 }
    }
  },
  'fade-right': {
    hidden: { opacity: 0, x: 180, rotateZ: 2 },
    visible: {
      opacity: 1,
      x: 0,
      rotateZ: 0,
      transition: { type: 'spring', stiffness: 60, damping: 18 }
    }
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.85, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 70, damping: 15 }
    }
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.15, rotate: 2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 70, damping: 15 }
    }
  },
  'rotate-fade': {
    hidden: { opacity: 0, rotate: -15, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 60, damping: 16 }
    }
  },
  'flip': {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { type: 'spring', stiffness: 50, damping: 14 }
    }
  },
  'skew-up': {
    hidden: { opacity: 0, y: 40, skewY: 8 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  }
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fade-up',
  duration = 600,
  offset = 100,
  once = false,
  delay = 0.2
}) => {

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          if (once) setHasAnimated(true);
        } else if (!once) {
          controls.start('hidden');
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px -${offset}px 0px` }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls, offset, once]);

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={hasAnimated ? 'visible' : controls}
        variants={animationVariants[animation]}
        transition={{
          duration: duration / 1000,
          delay,
          ease: [0.25, 0.1, 0.25, 1] // Smooth cubic-bezier
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default AnimateOnScroll;
