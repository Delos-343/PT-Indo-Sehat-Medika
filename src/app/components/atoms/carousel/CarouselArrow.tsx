'use client';

import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export type ArrowDir = 'left' | 'right';

interface CarouselArrowProps {
  dir: ArrowDir;
  onClick: () => void;
  className?: string;
  label?: string;
}

export const CarouselArrow: React.FC<CarouselArrowProps> = ({ dir, onClick, className = '', label }) => {
  return (
    <>
        <button
            aria-label={label ?? (dir === 'left' ? 'Previous slide' : 'Next slide')}
            type="button"
            onClick={onClick}
            className={`p-2 rounded-full bg-transparent hover:bg-[var(--color-primary)/5] transition-colors ${className}`}
        >
            {dir === 'left' ? <FiChevronLeft className="text-[var(--color-primary)] text-2xl" /> : <FiChevronRight className="text-[var(--color-primary)] text-2xl" />}
        </button>
    </>
  );
};
