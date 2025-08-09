'use client';

import React from 'react';

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <>
        <h3 className="w-full sm:text-3xl md:text-2xl uppercase font-bold tracking-widest text-[var(--color-primary)] mb-3">
            {children}
        </h3>
    </>
);
