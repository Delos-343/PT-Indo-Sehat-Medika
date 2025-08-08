'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavigationLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode | string; // Can be a React icon component or image URL
  iconAlt?: string;
  className?: string;
  external?: boolean; // Optional prop to open in new tab
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  label,
  icon,
  iconAlt,
  className = '',
  external = false,
}) => {
  const isImage = typeof icon === 'string';

  return (
    <>
      <Link
        href={href}
        className={`flex items-center gap-2 hover:underline hover:underline-offset-4 font-raleway font-medium transition-colors ${className}`}
        {...(external && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {icon &&
          (isImage ? (
            <Image
              aria-hidden
              src={icon}
              alt={iconAlt || ''}
              width={16}
              height={16}
            />
          ) : (
            <span aria-hidden>{icon}</span>
          ))}
        <span>{label}</span>
      </Link>
    </>
  );
};
