'use client';

import React from 'react';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';

export const ContactInfo: React.FC = () => {

  const items = [
    { icon: <FiMail />, label: 'ptindosehatmedika@gmail.com' },
    { icon: <FiPhone />, label: '+62 811 3077 7773' },
    { icon: <FiInstagram />, label: '@ptindosehatmedika' },
  ];

  return (
    <>
      <aside className="flex flex-col gap-8 p-6 md:p-10">
        <div className="space-y-6">
            {items.map((it, idx) => (
              <div key={idx} className="sm:flex items-center gap-4 inline-block">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-bg-primary)] text-lg">
                  {it.icon}
                </span>
                <span className="text-[var(--color-bg-primary)] text-center sm:text left text-xs sm:text-lg ml-3">
                  {it.label}
                </span>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
};
