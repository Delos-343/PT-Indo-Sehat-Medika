import Image from 'next/image';
import React from 'react';
// import Image from 'next/image';

interface LogoTextProps {
  className?: string;
}

export const LogoFooter: React.FC<LogoTextProps> = ({ className = '' }) => {
  return (
    <>
      <Image
        className="relative w-full flex justify-start items-start overflow-hidden"
        src="/logo/logo.png"
        alt="company logo"
        width={180}
        height={180}
        priority
      />
    </>
  );
};
