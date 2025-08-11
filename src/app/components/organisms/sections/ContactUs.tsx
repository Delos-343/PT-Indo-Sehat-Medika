'use client';

import React from 'react';
import { ContactForm, ContactInfo } from '../../molecules';

export const ContactUs: React.FC = () => {
  return (
    <>
      <section className="w-full my-3 md:my-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center md:text-right">
            Let&apos;s Work <span className="text-[var(--color-primary)]"> Together </span>
          </h2>

          {/* Card container: centered, rounded, deep-blue gradient */}
          <div className="w-full mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-t from-[#0F4A89] to-[#18528E]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left - ContactInfo
                  HIDE on small screens so the form occupies the full width.
                  Show on md+ as part of the grid (md:col-span-4).
              */}
              <div
                className="block md:col-span-4 bg-white/5 p-6 lg:p-16"
                aria-hidden="false"
              >
                <ContactInfo />
              </div>

              {/* Right - ContactForm (always present; full width on mobile) */}
              <div className="hidden md:block col-span-1 md:col-span-8 p-6 md:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
