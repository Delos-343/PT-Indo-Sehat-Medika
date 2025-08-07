import React from 'react';
import { Logo } from '../atoms/Logo';
import { NavigationLink } from '../molecules/NavigationLink';

export const Header: React.FC = () => {
  return (
    <header className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <NavigationLink
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        label="Learn"
        icon="/file.svg"
        iconAlt="File icon"
      />
      <NavigationLink
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        label="Examples"
        icon="/window.svg"
        iconAlt="Window icon"
      />
      <NavigationLink
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        label="Go to nextjs.org →"
        icon="/globe.svg"
        iconAlt="Globe icon"
      />
    </header>
  );
};
