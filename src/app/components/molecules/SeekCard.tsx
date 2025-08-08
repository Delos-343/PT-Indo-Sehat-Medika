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
        <div className="w-full flex flex-col justify-between bg-[var(--color-bg-primary)] rounded-2xl p-6 shadow-md h-full">
            <div>
                <CardTitle>
                    {title}
                </CardTitle>
                <p className="text-sm leading-relaxed text-[var(--color-primary-dark)] font-light">
                    {description}
                </p>
            </div>
            <div className="mt-6 w-full flex justify-center">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={343}
                    height={343}
                    className="relative object-contain overflow-visible max-h-24"
                />
            </div>
        </div>
    </>
);
