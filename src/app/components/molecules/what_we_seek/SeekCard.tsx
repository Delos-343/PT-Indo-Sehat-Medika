// src/app/components/molecules/SeekCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { CardTitle } from '../../atoms';

interface SeekCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const SeekCard: React.FC<SeekCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = '',
  imageWidth = 320,
  imageHeight = 320,
}) => {
  return (
    <>
        <article
            className="relative flex flex-col bg-[var(--color-bg-primary)] rounded-3xl border border-gray-300 shadow-md overflow-hidden h-[360px]"
            aria-label={title}
        >
            <div className="flex-1 px-6 pt-6">
                <CardTitle>
                    {title}
                </CardTitle>
                <p className="text-sm leading-6 text-[var(--color-primary-dark)] font-light opacity-75">
                    {description}
                </p>
            </div>
            {/* Large clipped image area - image size controlled by props */}
            <div className="relative w-full grid grid-col justify-end items-start overflow-hidden">
                <div
                    className="relative"
                    style={{
                        width: `${Math.min(imageWidth, 600)}px`,
                        height: `${Math.min(imageHeight, 600)}px`,
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes={`${Math.min(imageWidth, 600)}px`}
                    />
                </div>
            </div>
        </article>
    </>
  );
};
