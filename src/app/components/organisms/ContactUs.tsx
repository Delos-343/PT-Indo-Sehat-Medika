'use client';

import React from 'react';
import { ContactInfo } from '../molecules/contact/ContactInfo';
import { ContactForm } from '../molecules/contact/ContactForm';

export const ContactUs: React.FC = () => {
  return (
    <>
        <section className="w-full py-0 sm:py-20 my-16 sm:mt-0">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center sm:text-left">
                    Let's Work <span className="text-[var(--color-primary)]"> Together </span>
                </h2>
                {/* card container */}
                <div
                    className="
                        relative bg-gradient-to-t from-[rgba(55,196,226,1.0)] to-[rgba(15,75,138,0.9)]
                        rounded-3xl overflow-hidden
                        shadow-2xl
                        p-4 sm:p-0
                    "
                    style={{
                        background: 'var(--color-primary-dark)',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* left - contact info */}
                        <div className="md:col-span-4 bg-[rgba(255,255,255,0.04)] rounded-3xl p-6 md:p-24 lg:p-0">
                            <ContactInfo />
                        </div>
                        {/* right - the form */}
                        <div className="md:col-span-8 p-6">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};
