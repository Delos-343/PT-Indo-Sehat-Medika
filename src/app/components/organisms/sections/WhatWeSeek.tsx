'use client';

import React from 'react';
import { SeekCard } from '../../molecules';
import data from '../data/seekCards.json';
import { StaggerOnScroll } from '../../atoms';
import { motion, Variants } from 'framer-motion';

type CardItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 12 }, // slide up into place
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, // smooth, buttery
  },
};

export const WhatWeSeek: React.FC = () => {
  
  const list = data as CardItem[];

  return (
    <>
      <section className="w-full py-20 bg-transparent">
        <div className="w-full mx-auto px-6 lg:px-0">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingVariants}
            style={{ willChange: 'transform, opacity' }} // hint browser to optimize
          >
            What We <span className="text-[var(--color-primary)]">Seek</span>
          </motion.h2>

          <StaggerOnScroll
            staggerDelay={0.12}
            duration={0.6}
            offset={120}
            once
            className="!grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {list.map((item) => (
              <SeekCard
                key={item.title}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                imageWidth={item.imageWidth}
                imageHeight={item.imageHeight}
              />
            ))}
          </StaggerOnScroll>
        </div>
      </section>
    </>
  );
};
