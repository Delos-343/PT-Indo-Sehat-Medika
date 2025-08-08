'use client';

import React from 'react';

interface CardTitleProps {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => (
    <>
        <h3 className="text-xl font-bold uppercase text-[var(--color-primary)] mb-5">
            {children}
        </h3>
    </>
);
