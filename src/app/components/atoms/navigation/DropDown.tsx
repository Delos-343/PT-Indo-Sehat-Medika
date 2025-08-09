'use client';

import React from 'react';
import { NavigationLink } from '../../molecules/navigation/NavigationLink';
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
                md:hidden absolute inset-x-0 top-0
                bg-[var(--color-bg-primary)] shadow-lg z-20
            "
        >
            <nav className="flex flex-col px-4 pt-24 pb-4 space-y-4">
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
