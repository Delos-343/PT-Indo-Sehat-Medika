'use client';

import Image from 'next/image';
import React from 'react';

export const HexRow: React.FC<{ className?: string }> = ({ className = 'translate-y-1 absolute -top-5 sm:-top-80 left-0 overflow-ellipsis' }) => {
  return (
    <>
      <div className={className} aria-hidden="true">
        <Image
          src="/assets/medical_motif_ready.png"
          alt="" // decorative
          width={1440}
          height={280}
          className="w-full h-auto object-contain"
          priority={false}
        />
      </div>
    </>
  );
};
