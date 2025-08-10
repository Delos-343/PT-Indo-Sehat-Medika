'use client';

import React from 'react';

interface SocialIconsProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ href, icon, label }) => (
    <>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[var(--color-primary-dark)] text-xl hover:scale-110 transition-transform"
        >
            {icon}
        </a>
    </>
);
