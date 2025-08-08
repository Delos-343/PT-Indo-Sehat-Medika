import React from 'react';
import Image from 'next/image';

interface LogoWithTextProps {
  className?: string;
}

export const LogoWithText: React.FC<LogoWithTextProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-blue-900 font-semibold text-xs sm:text-lg leading-none">
        PT. Indo Sehat Medika
      </div>
    </div>
  );
};
