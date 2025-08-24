'use client';

import React from 'react';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';
import { FooterLink } from '../../molecules';
import { SocialIcons } from '../../atoms';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="w-full bg-transparent mt-6 md:mt-24 py-6 px-6">
        <div className="mx-auto flex flex-col items-center space-y-8">
            {/* Navigation + Logo + Copyright */}
            <FooterLink />
            {/* Social Media Icons */}
            <div className="flex gap-6">
              <SocialIcons href="mailto:headoffice@indosehatmedika.com" icon={<FiMail />} label="Email" />
              <SocialIcons href="tel:+6281130777773" icon={<FiPhone />} label="Phone" />
              <SocialIcons href="https://instagram.com/indosehatmedika" icon={<FiInstagram />} label="Instagram" />
            </div>
        </div>
      </footer>
    </>
  );
};
