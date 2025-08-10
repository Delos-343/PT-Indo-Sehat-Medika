'use client';

import React from 'react';
import Image from 'next/image';
import { CarouselImage } from '../../organisms/data/slideCards';

interface CarouselSlideProps {
  image: CarouselImage;
  style: React.CSSProperties;
  className?: string;
  label?: string;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({ image, style, className = '', label }) => {
  return (
    <>
      <div
        role="group"
        aria-label={label ?? image.alt}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform rounded-3xl max-w-full shadow-md overflow-hidden ${className}`}
        style={{
          width: 'clamp(280px, 68vw, 920px)',
          aspectRatio: '16/8.5',
          transition: 'transform 560ms cubic-bezier(.22,.9,.32,1), opacity 420ms ease, filter 420ms ease',
          ...style,
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1280px) 68vw, 920px"
          style={{ objectFit: 'cover' }}
          priority={image.id === 0}
        />
      </div>
    </>
  );
};
