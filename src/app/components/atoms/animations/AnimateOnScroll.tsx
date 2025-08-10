'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  duration?: number;
  offset?: number;
  once?: boolean;
}

const animationVariants: Record<string, Variants> = {

  'fade-up': { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  'fade-down': { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  'fade-left': { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },

  'zoom-in': { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  'zoom-out': { hidden: { opacity: 0, scale: 1.1 }, visible: { opacity: 1, scale: 1 } },
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fade-up',
  duration = 600,
  offset = 100,
  once = false,
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
        transition={{ duration: duration / 1000 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default AnimateOnScroll;
