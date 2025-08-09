'use client';

import React from 'react';

export interface ContactInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  hint?: string;
  className?: string;
}

export const ContactInput = React.forwardRef<HTMLInputElement, ContactInputProps>(
  ({ id, label, hint, className = '', ...props }, ref) => {
    return (
        <>
            <div className={`w-full ${className}`}>
                {label && (
                    <label htmlFor={id} className="block text-sm text-[var(--color-bg-primary)] mb-2">
                        {label}
                    </label>
                )}

                <input
                  id={id}
                  ref={ref}
                  {...props}
                  className="
                      w-full bg-transparent
                      border-b border-white/30
                      py-2 outline-none placeholder:text-white/50 text-gray-100
                      focus:border-[var(--color-primary)] transition-colors
                  "
                />

                {hint && <div className="mt-1 text-xs text-white/60">{hint}</div>}
            </div>
        </>
    );
  }
);

ContactInput.displayName = 'ContactInput';
