
export type CarouselImage = {
  id: number;
  src: string;
  alt: string;
};

export const CAROUSEL_IMAGES: CarouselImage[] = [
  { id: 0, src: '/assets/carousel-1.jpg', alt: 'Surgery team' },
  { id: 1, src: '/assets/carousel-2.jpg', alt: 'Medical device 1' },
  { id: 2, src: '/assets/carousel-3.jpg', alt: 'Medical device 2' },
  { id: 3, src: '/assets/carousel-4.jpg', alt: 'Hospital interior' },
  { id: 4, src: '/assets/carousel-5.jpg', alt: 'Medical supplies' },
];
