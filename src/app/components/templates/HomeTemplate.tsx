import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Hero } from '../organisms/Hero';
import { Second } from '../organisms/Second';

interface HomeTemplateProps {
  title?: string;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  title,
}) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 px-5 sm:px-20 py-10 bg-gray-100">
      <nav className="flex gap-[24px] flex-wrap items-center justify-center w-full">
        <Navbar />
      </nav>
      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center">
        <Hero title={title} />
        <Second />
      </main>
    </div>
  );
};
