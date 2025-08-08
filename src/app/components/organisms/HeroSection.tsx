'use client';

import React from 'react';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';

interface HeroSectionProps {
  title?: string;
  description?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Welcome to Next.js",
  description = "Get started by editing src/app/page.tsx",
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-2xl text-gray-900">
        Hero Section
      </div>
    </>
  );
};
