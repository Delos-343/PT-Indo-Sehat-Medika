'use client';

import React from 'react';

interface CarouselDotProps {
  active?: boolean;
  index: number;
  onClick: (i: number) => void;
  label?: string;
}

export const CarouselDot: React.FC<CarouselDotProps> = ({ active = false, index, onClick, label }) => {
  return (
    <>
        <button
            type="button"
            aria-label={label ?? `Go to slide ${index + 1}`}
            aria-current={active ? 'true' : undefined}
            className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${active ? 'bg-[var(--color-primary)] scale-110 shadow-lg' : 'bg-[var(--color-primary)]/40'}
            `}
            onClick={() => onClick(index)}
        />
    </>
  );
};
