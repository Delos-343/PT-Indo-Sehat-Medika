'use client';

import React from 'react';
import Link from 'next/link';
import { LogoFooter } from '../atoms/LogoFooter';

export const FooterLink: React.FC = () => {

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Our Services' },
    { href: '/contact', label: 'Contact Us' },
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
        <div className="my-1">
          <LogoFooter />
        </div>
        {/* Copyright */}
        <p className="text-sm text-[var(--color-primary-dark)]">
            © 2025 PT INDO SEHAT MEDIKA. <span className="ml-1"> All rights reserved. </span>
        </p>
        </div>
    </>
  );
};
