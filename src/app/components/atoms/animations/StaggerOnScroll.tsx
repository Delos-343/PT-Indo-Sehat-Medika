'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface StaggerOnScrollProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  duration?: number;
  offset?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0,
    },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

const StaggerOnScroll: React.FC<StaggerOnScrollProps> = ({
  children,
  staggerDelay = 0.15,
  duration = 0.6,
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
            variants={containerVariants}
            custom={staggerDelay}
            transition={{ duration }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            {React.Children.map(children, (child, i) => (
                <motion.div key={i} variants={childVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    </>
  );
};

export default StaggerOnScroll;
