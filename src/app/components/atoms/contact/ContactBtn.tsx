'use client';

import React from 'react';

interface ContactBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}

export const ContactBtn: React.FC<ContactBtnProps> = ({ children, variant = 'primary', ...rest }) => {

  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold shadow-md';
  
  const style =
    variant === 'primary'
      ? 'bg-[#0e2340] bg-opacity-80 text-white ring-1 ring-white/10 hover:translate-y-0.5 transition-transform'
      : 'bg-transparent text-white/90';

  return (
    <>
        <button {...rest} className={`${base} ${style}`}>
            {children}
        </button>
    </>
  );
};
