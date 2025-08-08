'use client';

import React from 'react';
import { BsHeartPulse } from 'react-icons/bs';
import { FiCloudDrizzle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa6';

interface HeroProps {
  title?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'PT INDO SEHAT MEDIKA',
}) => (
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
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-blue-900/80" />

    {/* Centered content */}
    <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-12 text-gray-100">
      <div className="inline-block text-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          
          {/* Title */}
          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-tight
              font-extrabold
              mb-24
            "
          >
            {title}
          </h1>

          {/* Icon labels row – fixed text size */}
          <div className="w-full flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:gap-x-12">
            <div className="flex items-center gap-3">
              <BsHeartPulse className="p-2 bg-white text-blue-700 rounded-full text-xl" />
              <span className="text-lg">Produk Kesehatan Berkualitas</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCloudDrizzle className="p-2 bg-white text-blue-700 rounded-full text-xl" />
              <span className="text-lg">Hidup Lebih Sehat</span>
            </div>
          </div>

          {/* Tagline + CTA row – same text size */}
          <div className="w-full flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:gap-x-12">
            <p className="text-lg uppercase tracking-wide">
              SOLUSI TERPERCAYA UNTUK KESEHATAN ANDA
            </p>
            <div className="flex items-center gap-3 group cursor-pointer">
              <FaArrowRight className="text-xl text-cyan-400 group-hover:translate-x-1 transition-transform" />
              <span className="text-lg uppercase tracking-wide group-hover:underline">
                Book Your Consultation
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);
