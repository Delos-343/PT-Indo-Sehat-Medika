'use client';

import React from 'react';

interface BadgeNumberProps {
  value?: string | number;
  className?: string;
}

export const BadgeNumber: React.FC<BadgeNumberProps> = ({ value, className = '' }) => {
  return (
    <>
      <div
        className={`inline-flex items-center justify-center text-xs font-medium text-[var(--color-primary-dark)] bg-[var(--color-bg-primary)] rounded-sm px-2 py-1 shadow-sm ${className}`}
        aria-hidden="true"
      >
        {value}
      </div>
    </>
  );
};
