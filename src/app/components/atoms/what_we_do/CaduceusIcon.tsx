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
  return (
    <>
        <div className={className} aria-hidden={ariaHidden}>
            <Image
                src="/assets/staff_of_hermes.png"
                alt="" // decorative
                width={width}
                height={height}
                className="w-auto h-auto object-contain z-0"
                priority={false}
            />
        </div>
    </>
  );
};
