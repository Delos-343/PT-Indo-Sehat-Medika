'use client';

import React from 'react';
import { BadgeNumber } from '../../atoms/what_we_do/BadgeNumber';
import { CaduceusIcon } from '../../atoms/what_we_do/CaduceusIcon';
import { MedicalCrossIcon } from '../../atoms/what_we_do/MedicalCrossIcon';

export type InfoCardVariant = 'lead' | 'feature' | 'small';

export interface InfoCardProps {
  id?: number | string;
  number?: string;
  variant?: InfoCardVariant;
  title: string;
  subtitle?: string;
  description?: string;
  /** optional small icon element to render inside the right side of a feature card */
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
  if (variant === 'lead') {
    return (
      <>
        <article
          className={`relative overflow-hidden rounded-3xl p-8 bg-[var(--color-primary)] text-[var(--color-primary-dark)] ${className} shadow-lg h-full md:h-[324px]`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          {/* Decorative big mark (right side) */}
          <div
            className="absolute right-6 top-8 pointer-events-none transform -translate-y-2 opacity-10 sm:opacity-90"
            aria-hidden="true"
          >
            <CaduceusIcon width={220} height={220} />
          </div>
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <BadgeNumber value={number ?? '00'} />
            </div>
            <h3 id={`card-${id || number}-title`} className="text-3xl font-extrabold leading-tight mb-4">
              {title}
            </h3>
            {description && <p className="text-base leading-relaxed text-[var(--color-bg-primary)] max-w-prose">{description}</p>}
          </div>
        </article>
      </>
    );
  }

  if (variant === 'feature') {
    return (
      <>
        <article
          className={`relative rounded-3xl p-6 bg-[var(--color-primary-dark)] text-white ${className} shadow-lg flex items-center justify-between gap-4`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          <div>
            <div className="mb-2">
              {/* Badge on dark background — show as white by passing bg className */}
              <BadgeNumber value={number ?? '01'} className="bg-white text-[var(--color-primary-dark)]" />
            </div>
            <h4 id={`card-${id || number}-title`} className="text-2xl font-extrabold text-[var(--color-bg-primary)] mb-1">
              {title}
            </h4>
            {subtitle && <div className="text-sm text-[var(--color-primary)]">{subtitle}</div>}
          </div>
          {/* right side circular icon container */}
          <div className="absolute right-6 top-8 pointer-events-none transform -translate-y-5 opacity-10 sm:opacity-90">
            <MedicalCrossIcon />
          </div>
        </article>
      </>
    );
  }

  // small (default)
  return (
    <>
      <article
        className={`relative rounded-3xl p-6 text-[var(--color-primary-dark)] ${className} shadow-sm`}
        aria-labelledby={`card-${id || number}-title`}
        role="region"
      >
        <div className="mb-3">
          <BadgeNumber value={number ?? '02'} className="bg-transparent" />
        </div>
        <h5 id={`card-${id || number}-title`} className="text-xl font-extrabold mb-2 text-[var(--color-primary)]">
          {title}
        </h5>
        {subtitle && <div className="text-sm text-[var(--color-primary-dark)] font-light opacity-75">{subtitle}</div>}
      </article>
    </>
  );
};
