'use client';

import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { BadgeNumber } from '../../atoms/what_we_do/BadgeNumber';
import { CaduceusIcon } from '../../atoms/what_we_do/CaduceusIcon';

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

/**
 * InfoCard - supports three visual variants:
 * - lead  : big cyan card with decorative caduceus on the right
 * - feature: large dark-blue card with a circular icon to the right
 * - small : small white cards with number badge and subtitle
 *
 * I adjusted invalid Tailwind classes (opacity-15 -> opacity-10), corrected image sizing via the CaduceusIcon props,
 * and ensured accessible labels.
 */
export const InfoCard: React.FC<InfoCardProps> = ({
  id,
  number,
  variant = 'small',
  title,
  subtitle,
  description,
  rightIcon,
  className = '',
}) => {
  if (variant === 'lead') {
    return (
      <>
        <article
          className={`relative overflow-hidden rounded-[28px] p-8 bg-[var(--color-primary)] text-[var(--color-primary-dark)] ${className} shadow-lg`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          {/* Decorative big mark (right side) */}
          <div
            className="absolute right-6 top-8 pointer-events-none transform -translate-y-2 opacity-10"
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
            {description && <p className="text-base leading-relaxed max-w-prose">{description}</p>}
          </div>
        </article>
      </>
    );
  }

  if (variant === 'feature') {
    return (
      <>
        <article
          className={`relative rounded-[28px] p-6 bg-[var(--color-primary-dark)] text-white ${className} shadow-lg flex items-center justify-between gap-4`}
          aria-labelledby={`card-${id || number}-title`}
          role="region"
        >
          <div>
            <div className="mb-2">
              {/* Badge on dark background — show as white by passing bg className */}
              <BadgeNumber value={number ?? '01'} className="bg-white text-[var(--color-primary-dark)]" />
            </div>
            <h4 id={`card-${id || number}-title`} className="text-2xl font-extrabold text-[var(--color-accent)] mb-1">
              {title}
            </h4>
            {subtitle && <div className="text-sm text-white/90">{subtitle}</div>}
          </div>

          {/* right side circular icon container */}
          <div
            className="ml-6 flex items-center justify-center w-20 h-20 rounded-full bg-white/10"
            aria-hidden="true"
          >
            {rightIcon ?? <FiPlusCircle className="text-3xl text-white/90" />}
          </div>
        </article>
      </>
    );
  }

  // small (default)
  return (
    <>
      <article
        className={`relative rounded-[20px] p-6 bg-white text-[var(--color-primary-dark)] ${className} shadow-sm`}
        aria-labelledby={`card-${id || number}-title`}
        role="region"
      >
        <div className="mb-3">
          <BadgeNumber value={number ?? '02'} className="bg-white" />
        </div>
        <h5 id={`card-${id || number}-title`} className="text-xl font-extrabold mb-2">
          {title}
        </h5>
        {subtitle && <div className="text-sm text-[var(--color-accent)]">{subtitle}</div>}
      </article>
    </>
  );
};
