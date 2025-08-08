'use client';
import React from 'react';
import { SeekCard } from '../molecules/SeekCard';

const data = [
  {
    title: 'Empathy',
    description: 'Kami Memahami Kebutuhan Pelanggan Dan Berusaha Memberikan Solusi Yang Memberikan Dampak Positif Terhadap Kesehatan Mereka.',
    imageSrc: '/images/empathy.png',
  },
  {
    title: 'Quality',
    description: 'Kami Berkomitmen Menyediakan Produk Dan Layanan Yang Memenuhi Standar Mutu Tertinggi.',
    imageSrc: '/images/quality.png',
  },
  {
    title: 'Integrity',
    description: 'Kami Menjunjung Tinggi Kejujuran, Transparansi, Dan Etika Dalam Setiap Aspek Bisnis.',
    imageSrc: '/images/integrity.png',
  },
  {
    title: 'Innovation',
    description: 'Kami Terus Mencari Cara Baru Dan Lebih Baik Untuk Melayani Pelanggan Melalui Teknologi Dan Pengembangan Produk Yang Berkelanjutan.',
    imageSrc: '/images/innovation.png',
  },
  {
    title: 'Partnership',
    description: 'Kami Membangun Hubungan Jangka Panjang Yang Saling Menguntungkan Dengan Mitra Bisnis, Pelanggan, Dan Komunitas.',
    imageSrc: '/images/partnership.png',
  },
];

export const Second: React.FC = () => (
    <>
        <section className="py-16 px-6 bg-[var(--color-bg-primary)]">
            <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-dark)] mb-12">
                What We Seek
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-6">
                {data.map((item) => (
                <SeekCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc}
                />
                ))}
            </div>
            </div>
        </section>
    </>
);
