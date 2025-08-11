'use client';

import React, { useState } from 'react';
import { FiMenu, FiX, FiCheckCircle, FiChevronDown, FiUser, FiHome } from 'react-icons/fi';
import { DropDown, Logo, SearchInput } from '../../atoms';
import { NavigationLink } from '../../molecules';

export const Navbar: React.FC = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="
          w-full sticky top-0 z-50
          bg-[var(--color-bg-primary)] rounded-3xl shadow-sm
          px-4 sm:px-6 md:px-8
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          {/* Search (always visible) */}
          <SearchInput />
          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavigationLink
              href="/"
              label="Home"
              icon={<FiHome className="text-[var(--color-primary-dark)] text-lg" />}
              className="text-[var(--color-primary-dark)]"
            />
            <NavigationLink
              href="/"
              label="About Us"
              icon={<FiCheckCircle className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
            <NavigationLink
              href="/"
              label="Our Services"
              icon={<FiChevronDown className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
            <NavigationLink
              href="/"
              label="Login"
              icon={<FiUser className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
          </nav>
          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden text-[var(--color-primary-dark)] text-2xl p-2 z-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileOpen((prev) => !prev);
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
      {/* Import MobileMenu */}
      <DropDown isOpen={mobileOpen} />
    </>
  );
};
