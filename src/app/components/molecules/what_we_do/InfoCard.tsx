'use client';

import React from 'react';
import { BadgeNumber, CaduceusIcon, MedicalCrossIcon } from '../../atoms';

export type InfoCardVariant = 'lead' | 'feature' | 'small';

export interface InfoCardProps {
  id?: number | string;
  number?: string;
  variant?: InfoCardVariant;
  title: string;
  subtitle?: string;
  description?: string;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  id,
  number,
  variant = 'small',
  title,
  subtitle,
  description,
  className = '',
}) => {
  // LEAD variant
  if (variant === 'lead') {
    return (
      <>
        <article
          className={`relative overflow-hidden rounded-3xl p-8 bg-[var(--color-primary)] text-[var(--color-primary-dark)] ${className} shadow-lg h-full flex flex-col`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          {/* Icon behind text for mobile & portrait tablet */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none lg:hidden">
            <CaduceusIcon
              width={300}
              height={300}
              className="opacity-10"
            />
          </div>
          {/* Content grid for desktop */}
          <div className="flex flex-col lg:flex-row h-full items-center lg:items-start gap-8 relative z-10">
            {/* Left/Text Section */}
            <div className="flex-1 flex flex-col h-full order-1 text-center md:text-left">
              <div className="mb-6">
                <BadgeNumber value={number ?? '00'} />
              </div>
              <h3
                id={`card-${id || number}-title`}
                className="text-3xl font-extrabold leading-tight mb-4"
              >
                {title}
              </h3>
              {description && (
                <p className="text-sm lg:text-lg leading-relaxed text-[var(--color-bg-primary)] max-w-prose">
                  {description}
                </p>
              )}
              <div className="mt-auto" />
            </div>
            {/* Right/Icon Section for desktop */}
            <div className="hidden lg:flex flex-shrink-0 justify-center items-center align-middle order-2">
              <CaduceusIcon
                width={220}
                height={220}
                className="opacity-90 max-w-full h-auto mt-10"
              />
            </div>
          </div>
        </article>
      </>
    );
  }

  // FEATURE variant
  if (variant === 'feature') {
    return (
      <>
        <article
          className={`relative rounded-3xl p-6 bg-[var(--color-primary-dark)] text-[var(--color-bg-primary)] ${className} shadow-lg flex flex-col justify-between gap-4 h-full`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          <div className="text-center md:text-left">
            <div className="mb-2">
              <BadgeNumber
                value={number ?? '01'}
                className="bg-[var(--color-bg-primary)] text-[var(--color-primary-dark)]"
              />
            </div>
            <h4
              id={`card-${id || number}-title`}
              className="font-extrabold text-[var(--color-bg-primary)] mb-1 text-md lg:text-3xl"
            >
              {title}
            </h4>
            {subtitle && (
              <div className="text-sm text-[var(--color-primary)]">{subtitle}</div>
            )}
          </div>
          <div
            className="flex-shrink-0 flex justify-center items-center lg:justify-end lg:items-start order-2"
            aria-hidden
          >
            <MedicalCrossIcon className="opacity-10 lg:opacity-90 max-w-full h-auto" />
          </div>
        </article>
      </>
    );
  }

  // SMALL variant
  return (
    <>
      <article
        className={`relative rounded-3xl p-6 text-[var(--color-primary-dark)] ${className} shadow-sm flex flex-col h-full`}
        aria-labelledby={`card-${id || number}-title`}
        role="region"
      >
        <div className="mb-3">
          <BadgeNumber
            value={number ?? '02'}
            className="bg-transparent border border-gray-300"
          />
        </div>
        <h5
          id={`card-${id || number}-title`}
          className="font-extrabold mb-2 text-[var(--color-primary)] text-xs lg:text-3xl"
        >
          {title}
        </h5>
        {subtitle && (
          <div className="text-xs lg:text-sm text-[var(--color-primary-dark)] font-light opacity-75">
            {subtitle}
          </div>
        )}
        <div className="mt-auto" />
      </article>
    </>
  );
};
