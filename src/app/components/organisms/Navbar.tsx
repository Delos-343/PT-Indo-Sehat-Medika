'use client';

import React from 'react';
import { NavigationLink } from '../molecules/NavigationLink';
import { LogoWithText } from '../atoms/LogoWithText';
import { FiSearch, FiHome, FiCheckCircle, FiChevronDown, FiUser } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  return (
    <>
      <header
        className="
          sticky top-0 z-50 flex items-center justify-between
          w-full px-6 py-3
          bg-[var(--color-bg-primary)]
          rounded-3xl shadow-sm
        "
      >
        {/* Logo + divider */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <LogoWithText />
          <div className="hidden md:block h-8 border-l border-[var(--color-primary-dark)]" />
        </div>

        {/* Search */}
        <div className="flex-grow max-w-md mx-6">
          <div className="flex items-center gap-2 bg-gray-100/80 px-4 py-2 rounded-full">
            <FiSearch className="text-[var(--color-primary)] text-lg" />
            <input
              type="search"
              placeholder="Search Here..."
              className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationLink
            href="/"
            label="Home"
            icon={<FiHome className="text-[var(--color-primary-dark)] text-lg" />}
            className="text-[var(--color-primary-dark)]"      // dark navy
          />
          <NavigationLink
            href="/about"
            label="About Us"
            icon={<FiCheckCircle className="text-[var(--color-primary)] text-lg" />}
            className="text-[var(--color-primary)]"          // bright cyan
          />
          <NavigationLink
            href="/services"
            label="Our Services"
            icon={<FiChevronDown className="text-[var(--color-primary)] text-lg" />}
            className="text-[var(--color-primary)]"          // bright cyan
          />
          <NavigationLink
            href="/login"
            label="Login"
            icon={<FiUser className="text-[var(--color-primary)] text-lg" />}
            className="text-[var(--color-primary)]"          // bright cyan
          />
        </nav>
      </header>
    </>
  );
};
