import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavigationLinkProps {
  href: string;
  label: string;
  icon?: string;
  iconAlt?: string;
  className?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  label,
  icon,
  iconAlt,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 hover:underline hover:underline-offset-4 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && (
        <Image
          aria-hidden
          src={icon}
          alt={iconAlt || ''}
          width={16}
          height={16}
        />
      )}
      {label}
    </Link>
  );
};
