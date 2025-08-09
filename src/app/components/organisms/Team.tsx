"use client";

import { data } from "./data/teamCards";
import * as Icons from "react-icons/fa";
import TeamCard from "../molecules/team/TeamCard";

export default function Team() {
  return (
    <>
        <section className="w-full bg-[var(--color-bg-primary)]">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12 text-center sm:text-right">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {data.map((member) => (
                        <TeamCard
                            key={member.id} // ✅ Unique key from JSON data
                            name={member.name}
                            role={member.role}
                            Icon={member.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    </>
  );
}
