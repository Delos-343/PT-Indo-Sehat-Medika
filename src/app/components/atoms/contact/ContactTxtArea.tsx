'use client';

import React from 'react';

export interface ContactTxtAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  className?: string;
}

export const ContactTxtArea = React.forwardRef<HTMLTextAreaElement, ContactTxtAreaProps>(
  ({ id, label, className = '', ...props }, ref) => {
    return (
        <>
            <div className={`w-full ${className}`}>
                {label && (
                <label htmlFor={id} className="block text-sm text-[var(--color-bg-primary)] mb-2">
                    {label}
                </label>
                )}
                <textarea
                    id={id}
                    ref={ref}
                    rows={5}
                    {...props}
                    className="
                        w-full bg-transparent
                        border-b border-white/30 resize-none
                        py-2 outline-none placeholder:text-white/50 text-white
                        focus:border-[var(--color-primary)] transition-colors
                    "
                />
            </div>
        </>
    );
  }
);

ContactTxtArea.displayName = 'ContactTxtArea';
