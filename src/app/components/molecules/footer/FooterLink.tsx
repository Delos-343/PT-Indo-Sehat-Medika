'use client';

import React from 'react';
import Link from 'next/link';
import { LogoFooter } from '../../atoms';

export const FooterLink: React.FC = () => {

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'About Us' },
    { href: '/', label: 'Our Services' },
    { href: '/', label: 'Contact Us' },
  ];

  return (
    <>
        <div className="flex flex-col items-center gap-6 text-center">
        {/* Top nav links */}
        <div className="flex gap-10 flex-wrap justify-center">
            {navLinks.map(({ href, label }) => (
            <Link
                key={href}
                href={href}
                className="text-[var(--color-primary-dark)] font-semibold hover:underline"
            >
                {label}
            </Link>
            ))}
        </div>
        {/* Logo center */}
        <div>
          <LogoFooter />
        </div>
        {/* Copyright */}
        <p className="text-xs sm:text-base text-[var(--color-primary-dark)]">
            © 2025 PT INDO SEHAT MEDIKA. All rights reserved.
        </p>
        </div>
    </>
  );
};
