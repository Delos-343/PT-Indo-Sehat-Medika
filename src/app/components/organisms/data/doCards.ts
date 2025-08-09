export type DoCard = {
  id: number;
  variant: 'lead' | 'feature' | 'small';
  number?: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export const WHAT_WE_DO_CARDS: DoCard[] = [
  {
    id: 0,
    variant: 'lead',
    number: '00',
    title: 'What We See',
    description:
      'Menjadi Perusahaan Distribusi Produk Kesehatan Terpercaya Dan Inovatif Di Indonesia Yang Mendukung Gaya Hidup Sehat Dan Peningkatan Kualitas Hidup Masyarakat.',
  },
  {
    id: 1,
    variant: 'feature',
    number: '01',
    title: 'Meningkatkan',
    subtitle: 'Portofolio Produk Berkualitas',
  },
  {
    id: 2,
    variant: 'small',
    number: '02',
    title: 'Memperluas',
    subtitle: 'Jangkauan Distribusi Secara Nasional',
  },
  {
    id: 3,
    variant: 'small',
    number: '03',
    title: 'Membangun',
    subtitle: 'Kepercayaan Dan Loyalitas Pelanggan',
  },
];
