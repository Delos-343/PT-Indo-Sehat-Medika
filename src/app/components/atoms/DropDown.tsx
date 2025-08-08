'use client';

import React from 'react';
import { NavigationLink } from '../molecules/NavigationLink';
import {
  FiHome,
  FiCheckCircle,
  FiChevronDown,
  FiUser,
} from 'react-icons/fi';

interface DropDownProps {
  isOpen: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({ isOpen }) => {

  if (!isOpen) return null;

  return (
    <>
        <div
            className="
                md:hidden absolute inset-x-0 top-[4.5rem]
                bg-[var(--color-bg-primary)] shadow-lg z-50
            "
        >
            <nav className="flex flex-col px-4 py-4 space-y-3">
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
        </div>
    </>
  );
};
