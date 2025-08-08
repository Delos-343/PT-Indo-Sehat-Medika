'use client';

import React from 'react';

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => (
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
