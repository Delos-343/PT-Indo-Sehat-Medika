'use client';

import React from 'react';

interface ContactRadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name?: string;
}

export const ContactRadio: React.FC<ContactRadioProps> = ({ label, checked, onChange, name = 'contact-radio' }) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
          checked ? 'bg-white/90' : 'bg-white/10'
        }`}
      >
        <span className={`${checked ? 'w-3 h-3 rounded-full bg-[#0F4A89]' : 'w-0 h-0'}`} />
      </span>
      <span className="text-slate-100 text-sm">{label}</span>
    </label>
  );
};
