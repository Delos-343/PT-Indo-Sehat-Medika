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
        <div className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-md h-full">
            <div>
                <CardTitle>
                    {title}
                </CardTitle>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="mt-6 w-full flex justify-center">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={120}
                    height={120}
                    className="object-contain max-h-[80px]"
                />
            </div>
        </div>
    </>
);
