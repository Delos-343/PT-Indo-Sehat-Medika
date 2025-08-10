'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

type Props = React.PropsWithChildren<{
  staggerDelay?: number;
  duration?: number;
  offset?: number;
  once?: boolean;
  className?: string;
}>;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = 0.15) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0,
    },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      mass: 1,
    },
  },
};

export default function StaggerOnScroll({
  children,
  staggerDelay = 0.15,
  duration = 0.6,
  offset = 100,
  once = false,
  className,
}: Props) {

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.1, rootMargin: `0px 0px -${offset}px 0px` }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, offset, once]);

  const items = React.Children.toArray(children);

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        custom={staggerDelay}
        transition={{ duration }}
        className={className}
      >
        {items.map((child, i) => (
          <motion.div key={i} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
