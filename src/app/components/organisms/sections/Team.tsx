'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { data } from '../data/teamCards';
import TeamCard from '../../molecules/team/TeamCard';

const headingVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
  },
};


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
  hidden: { opacity: 0, x: 40, scale: 0.98 },
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

export default function Team() {
  
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  // config
  const staggerDelay = 0.12;
  const duration = 0.6;
  const offset = 120; // px
  const once = true;

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

  return (
    <>
      <section className="w-full bg-transparent">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center sm:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingVariants}
          >
            Who <span className="text-[var(--color-primary)]"> We </span> Are
          </motion.h2>

          {/* Animated grid container — controls drive children */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            custom={staggerDelay}
            transition={{ duration }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {data.map((member) => (
              <motion.div
                key={member.id}
                variants={childVariants}
              >
                <TeamCard name={member.name} role={member.role} Icon={member.icon} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
