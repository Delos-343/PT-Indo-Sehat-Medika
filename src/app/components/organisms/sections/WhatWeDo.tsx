'use client';

import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { InfoCard } from '../../molecules/what_we_do/InfoCard';
import { HexRow } from '../../molecules/what_we_do/HexRow';
import { WHAT_WE_DO_CARDS } from '../data/doCards';

export const WhatWeDo: React.FC = () => {

  const lead = WHAT_WE_DO_CARDS.find(c => c.variant === 'lead');
  const feature = WHAT_WE_DO_CARDS.find(c => c.variant === 'feature');
  const smalls = WHAT_WE_DO_CARDS.filter(c => c.variant === 'small');

  return (
  <>
    <section className="w-full bg-transparent py-16 m-auto sm:mt-48">
      <div className="mx-auto">
        {/* Top motif image */}
        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 flex justify-end items-start">
              <HexRow />
            </div>
          </div>
        </div>
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center md:text-right">
          What We <span className="text-[var(--color-primary)]">Do</span>
        </h2>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Lead Card */}
          <div className="md:col-span-2 fade-up flex flex-col">
            {lead && (
              <InfoCard
                id={lead.id}
                number={lead.number}
                variant="lead"
                title={lead.title}
                description={lead.description}
              />
            )}
          </div>
          {/* Feature + Small Cards */}
          <div className="flex flex-col gap-6">
            {feature && (
              <div className="fade-up" style={{ animationDelay: '80ms' }}>
                <InfoCard
                  id={feature.id}
                  number={feature.number}
                  variant="feature"
                  title={feature.title}
                  subtitle={feature.subtitle}
                  rightIcon={<FiPlus className="text-3xl text-white/90" />}
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smalls.map((s, idx) => (
                <div
                  key={s.id}
                  className="fade-up"
                  style={{ animationDelay: `${160 + idx * 40}ms` }}
                >
                  <InfoCard
                    id={s.id}
                    number={s.number}
                    variant="small"
                    title={s.title}
                    subtitle={s.subtitle}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};
