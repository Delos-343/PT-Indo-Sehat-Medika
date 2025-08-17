import Image from 'next/image';
import React from 'react';

interface LogoTextProps {
  className?: string;
}

export const LogoFooter: React.FC<LogoTextProps> = ({ className = 'relative w-full flex justify-start items-start overflow-hidden' }) => {
  return (
    <>
      <Image
        className={className}
        src="/logo/logo.png"
        alt="company logo"
        width={180}
        height={180}
        priority
      />
    </>
  );
};
