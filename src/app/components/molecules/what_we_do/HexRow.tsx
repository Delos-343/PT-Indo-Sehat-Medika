'use client';

import Image from 'next/image';
import React from 'react';

export const HexRow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <>
      <div className={className} aria-hidden="true">
        <Image
          src="/assets/medical_motif_ready.png"
          alt="" // decorative
          width={720}
          height={140}
          className="w-full h-auto object-contain"
          priority={false}
        />
      </div>
    </>
  );
};
