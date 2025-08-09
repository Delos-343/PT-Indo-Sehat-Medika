'use client';

import Image from 'next/image';
import React from 'react';

interface CaduceusIconProps {
  className?: string;
  ariaHidden?: boolean;
  width?: number;
  height?: number;
}

export const CaduceusIcon: React.FC<CaduceusIconProps> = ({ className = '', ariaHidden = true, width = 220, height = 220 }) => {
  // Decorative image — mark aria-hidden and empty alt to avoid screen reader noise.
  return (
    <>
        <div className={className} aria-hidden={ariaHidden}>
            <Image
                src="/assets/staff_of_hermes.png"
                alt="" // decorative
                width={width}
                height={height}
                className="w-auto h-auto object-contain"
                priority={false}
            />
        </div>
    </>
  );
};
