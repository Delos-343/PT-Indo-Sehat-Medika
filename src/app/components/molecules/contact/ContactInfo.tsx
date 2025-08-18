'use client';

import React from 'react';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';

export const ContactInfo: React.FC = () => {

  const items = [
    { icon: <FiMail />, label: 'headoffice@indosehatmedika.com' },
    { icon: <FiPhone />, label: '+62 811 3077 7773' },
    { icon: <FiInstagram />, label: '@ indosehatmedika' },
  ];

  return (
    <>
      <aside className="flex flex-col gap-8 p-6 lg:p-10 w-full justify-center align-middle items-center md:hidden lg:flex">
        <div className="space-y-6">
            {items.map((it, idx) => (
              <div key={idx} className="sm:flex gap-4">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-bg-primary)] text-xs lg:text-lg">
                  {it.icon}
                </span>
                <span className="text-[var(--color-bg-primary)] text-center md:text-left text-xs lg:text-lg mx-2">
                  {it.label}
                </span>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
};
