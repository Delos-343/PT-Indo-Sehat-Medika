'use client';

import React from 'react';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';
import { FooterLink } from '../../molecules/footer/FooterLink';
import { SocialIcons } from '../../atoms/footer/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="w-full bg-transparent mt-12 md:mt-36 py-6 px-6">
        <div className="mx-auto flex flex-col items-center space-y-8">
            {/* Navigation + Logo + Copyright */}
            <FooterLink />
            {/* Social Media Icons */}
            <div className="flex gap-6">
              <SocialIcons href="mailto:info@indosehatmedika.com" icon={<FiMail />} label="Email" />
              <SocialIcons href="tel:+62000000000" icon={<FiPhone />} label="Phone" />
              <SocialIcons href="https://instagram.com/indosehatmedika" icon={<FiInstagram />} label="Instagram" />
            </div>
        </div>
      </footer>
    </>
  );
};
