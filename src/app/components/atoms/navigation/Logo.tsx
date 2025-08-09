import Image from 'next/image';
import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <>
      <div className="h-16 flex items-center px-4">
        <Image
          src="/logo/logo.png"
          alt="company logo"
          width={270}
          height={57}
          className="h-full w-auto object-contain py-0 my-0"
          priority
        />
      </div>
    </>
  );
};
