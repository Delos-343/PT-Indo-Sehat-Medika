'use client';

import React, { useState } from 'react';
import { NavigationLink } from '../molecules/NavigationLink';
import { LogoWithText } from '../atoms/LogoWithText';
import { FiSearch, FiMenu, FiX, FiCheckCircle, FiChevronDown, FiUser, FiHome } from 'react-icons/fi';
import { DropDown } from '../atoms/DropDown';

export const Navbar: React.FC = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="
          w-full sticky top-0 z-50
          bg-[var(--color-bg-primary)] rounded-3xl shadow-sm
          px-4 sm:px-6 md:px-8 py-3
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LogoWithText />
          </div>

          {/* Search (always visible) */}
          <div className="flex-grow mx-4 md:mx-6">
            <div className="flex items-center bg-gray-100/80 px-3 py-2 rounded-full w-full md:max-w-md">
              <FiSearch className="text-[var(--color-primary)] text-lg flex-shrink-0" />
              <input
                type="search"
                placeholder="Search Here..."
                className="ml-2 w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationLink
              href="/"
              label="Home"
              icon={<FiHome className="text-[var(--color-primary-dark)] text-lg" />}
              className="text-[var(--color-primary-dark)]"
            />
            <NavigationLink
              href="/about"
              label="About Us"
              icon={<FiCheckCircle className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
            <NavigationLink
              href="/services"
              label="Our Services"
              icon={<FiChevronDown className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
            <NavigationLink
              href="/login"
              label="Login"
              icon={<FiUser className="text-[var(--color-primary)] text-lg" />}
              className="text-[var(--color-primary)]"
            />
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden text-[var(--color-primary-dark)] text-2xl p-2 z-50"
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
