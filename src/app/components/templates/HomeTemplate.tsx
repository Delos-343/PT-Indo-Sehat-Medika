import React from 'react';
import { HeroSection } from '../organisms/HeroSection';
import { Header } from '../organisms/Header';

interface HomeTemplateProps {
  title?: string;
  description?: string;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  title,
  description,
}) => {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 p-10 bg-gray-100">
      <nav className="flex gap-[24px] flex-wrap items-center justify-center w-full">
        <Header />
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HeroSection title={title} description={description} />
      </main>
    </div>
  );
};
