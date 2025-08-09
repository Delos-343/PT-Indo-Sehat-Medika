import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-[120px] h-[25px]',
    md: 'w-[180px] h-[38px]',
    lg: 'w-[240px] h-[50px]',
  };

  return (
    <>
      <Image
        className={`${sizeClasses[size]} dark:invert ${className}`}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </>
  );
};
