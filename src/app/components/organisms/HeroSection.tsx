'use client';

import React from 'react';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import Image from 'next/image';

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
      <div className="w-full h-full text-gray-100" style={{
        background: "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)"
      }}>
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <Image className="object-cover object-center" alt="hero" src="https://unsplash.com/photos/a-room-filled-with-lots-of-dental-equipment-eiPL6Yo4FlY" width={1920} height={1080} />
          <div className="text-center lg:w-5/12 w-full">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Turn your designs into production-ready frontend
            </h1>
            <p className="text-2xl mb-8">
              Ship products 5-10x faster with your existing design tools, tech stacks & workflows!
            </p>
            <div className="flex justify-center mx-auto">
              <button
                className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8">
                View Projects
              </button>
              <button
                className="ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8">
                Plugins
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};
