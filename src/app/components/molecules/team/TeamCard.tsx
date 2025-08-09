"use client";

import { IconType } from "react-icons";

interface TeamCardProps {
  name: string;
  role: string;
  Icon: IconType;
}

export default function TeamCard({ name, role, Icon }: TeamCardProps) {
  return (
    <>
        <article
            className="relative flex flex-col bg-[var(--color-bg-primary)] rounded-3xl border border-gray-300 shadow-md overflow-hidden h-[360px]"
            aria-label={name}
        >
            <div className="flex-1 px-6 pt-6">
                <h3 className="sm:text-3xl md:text-2xl uppercase font-bold tracking-widest text-[var(--color-primary)] mb-3">
                    {name}
                </h3>
                <p className="text-sm leading-6 text-[var(--color-primary-dark)] font-light opacity-75">
                    {role}
                </p>
            </div>
            {/* Large clipped image area - image size controlled by props */}
            <div className="relative w-full grid grid-col justify-start items-stretch overflow-hidden">
                <div className="block h-[50px]"></div>
                <div className="relative bg-transparent text-[300px] text-[var(--color-primary-dark)] ml-24">
                    <Icon />
                </div>
            </div>
        </article>
    </>
  );
}
