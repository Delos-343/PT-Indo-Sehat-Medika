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
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform ${className}`}
            style={{
                width: 'clamp(280px, 68vw, 920px)',
                maxWidth: '920px',
                aspectRatio: '16/8.5',
                borderRadius: '38px',
                overflow: 'hidden',
                boxShadow: '0 18px 30px rgba(2,6,23,0.18)',
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
