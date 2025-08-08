'use client';

import React from 'react';
import Image from 'next/image';
import { CardTitle } from '../atoms/CardTitle';

interface SeekCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export const SeekCard: React.FC<SeekCardProps> = ({ title, description, imageSrc, imageAlt = '' }) => (
    <>
        <div className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardTitle>{title}</CardTitle>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            {description}
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-visible">
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
            />
            </div>
        </div>
    </>
);
