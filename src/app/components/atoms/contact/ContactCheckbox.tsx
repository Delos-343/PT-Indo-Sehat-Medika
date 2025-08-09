'use client';

import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface ContactCheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
}

export const ContactCheckbox: React.FC<ContactCheckboxProps> = ({ id, checked = false, onChange, label }) => {
  return (
    <>
        <button
          type="button"
          aria-pressed={checked}
          onClick={() => onChange && onChange(!checked)}
          className="inline-flex items-center gap-2 focus:outline-none"
        >
          <span
              className={`
                w-7 h-7 rounded-full flex items-center justify-center
                ${checked ? 'bg-[var(--color-primary)] text-[var(--color-bg-primary)]' : 'bg-white/10 text-white/80'}
                transition-colors
              `}
              aria-hidden
          >
              {checked ? <FiCheck className="w-4 h-4" /> : null}
          </span>
          {label && <span className="text-sm text-white/90"> {label} </span>}
        </button>
    </>
  );
};
