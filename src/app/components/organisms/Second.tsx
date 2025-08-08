'use client';
import React from 'react';
import { SeekCard } from '../molecules/SeekCard';

const list = [
  {
    title: 'Empathy',
    description:
      'Kami Memahami Kebutuhan Pelanggan Dan Berusaha Memberikan Solusi Yang Memberikan Dampak Positif Terhadap Kesehatan Mereka.',
    imageSrc: '/assets/medical-stethoscope-with-heart.png',
    imageAlt: 'Stethoscope',
  },
  {
    title: 'Quality',
    description:
      'Kami Berkomitmen Menyediakan Produk Dan Layanan Yang Memenuhi Standar Mutu Tertinggi.',
    imageSrc: '/assets/advanced-medical-equipment.png',
    imageAlt: 'Hospital equipment',
  },
  {
    title: 'Integrity',
    description:
      'Kami Menjunjung Tinggi Kejujuran, Transparansi, Dan Etika Dalam Setiap Aspek Bisnis.',
    imageSrc: '/assets/defibrillator.png',
    imageAlt: 'Monitoring device',
  },
  {
    title: 'Innovation',
    description:
      'Kami Terus Mencari Cara Baru Dan Lebih Baik Untuk Melayani Pelanggan Melalui Teknologi Dan Pengembangan Produk Yang Berkelanjutan.',
    imageSrc: '/assets/medical-robot.png',
    imageAlt: 'Robotic machine',
  },
  {
    title: 'Partnership',
    description:
      'Kami Membangun Hubungan Jangka Panjang Yang Saling Menguntungkan Dengan Mitra Bisnis, Pelanggan, Dan Komunitas.',
    imageSrc: '/assets/medical-shake-hands.png',
    imageAlt: 'Handshake',
  },
];

export const Second: React.FC = () => (
  <>
    <section className="w-full py-16 bg-[var(--color-bg-primary)]">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-12 text-center sm:text-left">
          What We Seek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {list.map((item) => (
            <SeekCard
              key={item.title}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  </>
);
