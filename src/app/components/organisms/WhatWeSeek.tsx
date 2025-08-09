'use client';

import React from 'react';
import { SeekCard } from '../molecules/what_we_seek/SeekCard';
import data from './data/seekCards.json'; // adjust relative path if needed

type CardItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const WhatWeSeek: React.FC = () => {
  
  const list = data as CardItem[];

  return (
    <>
      <section className="w-full py-20 bg-transparent">
        <div className="w-full mx-auto px-6 lg:px-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center sm:text-left">
            What We <span className="text-[var(--color-primary)]"> Seek </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {list.map((item) => (
              <SeekCard
                key={item.title}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                imageWidth={item.imageWidth}
                imageHeight={item.imageHeight}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
