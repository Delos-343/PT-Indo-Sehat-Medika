import React from 'react';
import { NavigationLink } from '../molecules/NavigationLink';
import { Input } from '../atoms/Input';
import { LogoWithText } from '../atoms/LogoWithText';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-100 shadow-md sticky top-0 z-50 w-full rounded-lg">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <LogoWithText />
      </div>

      {/* Center: Search Input */}
      <div className="flex-grow max-w-lg mx-6">
        <Input
          type="text"
          placeholder="Search your topic"
          className="w-full"
        />
      </div>

      {/* Right: Navigation Links */}
      <nav className="hidden md:flex space-x-8 text-blue-900 --font-raleway">
        <NavigationLink href="/" label="Home" />
        <NavigationLink href="/about" label="About Us" />
        <NavigationLink href="/services" label="Our Services" />
        <NavigationLink href="/login" label="Login" />
      </nav>

      {/* Mobile menu button (optional for now) */}
      {/* Could be added later for full responsiveness */}
    </header>
  );
};
