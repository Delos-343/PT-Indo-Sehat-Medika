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
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Logo size="md" />
      
      <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <li className="mb-2 tracking-[-.01em]">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
            {description}
          </code>
        </li>
        <li className="tracking-[-.01em]">
          Save and see your changes instantly.
        </li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.open('https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app', '_blank')}
        >
          <span className="flex items-center gap-2">
            <img
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </span>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open('https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app', '_blank')}
        >
          Read our docs
        </Button>
      </div>
    </main>
  );
};
