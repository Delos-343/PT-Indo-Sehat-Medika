'use client';

import React from 'react';
import { BsHeartPulse } from 'react-icons/bs';
import { FiCloudDrizzle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { motion } from 'framer-motion'

interface HeroProps {
  title?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'PT INDO SEHAT MEDIKA',
}) => (
  <>
    <section
      className="
        relative w-full
        h-[90vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh]
        rounded-3xl overflow-hidden
        bg-[url('https://plus.unsplash.com/premium_photo-1675686363399-91ad6111f82d?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D')]
        bg-center bg-cover
      "
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(55,196,226,0.7), rgba(15,75,138,0.9))',
        }}
      />
      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-12 text-[var(--color-bg-primary)]">
        <div className="inline-block text-center">
          <div className="flex flex-col items-center justify-center space-y-16">
            {/* Title */}
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-extrabold mb-24">
              {title}
            </h1>
            {/* Icon labels row */}
            <div className="w-full flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:gap-x-12">
              <div className="flex items-center gap-3">
                <BsHeartPulse
                  className="
                    p-2
                    bg-[var(--color-bg-primary)]
                    text-[var(--color-primary-dark)]
                    rounded-full
                    text-3xl
                  "
                />
                <span className="text-lg"> Produk Kesehatan Berkualitas </span>
              </div>
              <div className="flex items-center gap-3">
                <FiCloudDrizzle
                  className="
                    p-2
                    bg-[var(--color-bg-primary)]
                    text-[var(--color-primary-dark)]
                    rounded-full
                    text-3xl
                  "
                />
                <span className="text-lg"> Hidup Lebih Sehat </span>
              </div>
            </div>
            {/* Tagline + CTA row */}
            <div className="w-full flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:gap-x-12">
              <p className="text-lg uppercase tracking-wide">
                SOLUSI TERPERCAYA UNTUK KESEHATAN ANDA
              </p>
              {/* Motion-enabled Link */}
              <motion.div
                whileHover="hover"
                whileTap="hover"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Link href="#contact-us" scroll={true} className="flex items-center gap-3">
                  {/* Arrow icon */}
                  <motion.span
                    variants={{ hover: { x: 6 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="
                      p-2
                      bg-[var(--color-bg-primary)]
                      text-[var(--color-primary-dark)]
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaArrowRight />
                  </motion.span>

                  {/* Text with animated underline */}
                  <span className="relative text-lg uppercase tracking-wide">
                    Hubungi Kita Sekarang
                    <motion.span
                      variants={{ hover: { width: "100%" } }}
                      initial={{ width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 -bottom-1 h-[2px] bg-[var(--color-primary)]"
                    />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
