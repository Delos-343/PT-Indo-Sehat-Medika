import Image from 'next/image';
import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <>
      <div className={`relative h-16 overflow-hidden flex items-center ${className}`}>
        <div className="relative w-[180px] h-[80px] -mt-2"> {/* slightly taller than navbar */}
          <Image
            src="/logo/logo.png"
            alt="Company logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </>
  );
};
