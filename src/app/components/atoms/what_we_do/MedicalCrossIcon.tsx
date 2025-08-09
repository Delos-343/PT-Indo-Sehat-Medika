'use client';

import Image from 'next/image';
import React from 'react';

interface MedicalCrossIconProps {
  className?: string;
  ariaHidden?: boolean;
  width?: number;
  height?: number;
}

export const MedicalCrossIcon: React.FC<MedicalCrossIconProps> = ({ className = 'opacity-90', ariaHidden = true, width = 120, height = 120 }) => {
  // Decorative image — mark aria-hidden and empty alt to avoid screen reader noise.
  return (
    <>
        <div className={className} aria-hidden={ariaHidden}>
            <Image
                src="/assets/medical_cross_ready.png"
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
