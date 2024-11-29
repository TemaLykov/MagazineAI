import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  isDark: boolean;
}

const defaultPhotos = [
  {
    url: 'https://i.imgur.com/v72hioy.jpeg',
    style: 'Christmas'
  },
  {
    url: 'https://i.imgur.com/IzGpN1V.jpeg',
    style: 'Western'
  },
  {
    url: 'https://i.imgur.com/GrJCng2.jpeg',
    style: 'Desert'
  },
  {
    url: 'https://i.imgur.com/dTmSEIh.jpeg',
    style: 'Cyberpunk'
  },
  {
    url: 'https://i.imgur.com/BozcNhp.jpeg',
    style: 'Celebrity'
  },
  {
    url: 'https://i.imgur.com/gXwm56f.jpeg',
    style: 'Viking'
  }
];

export default function PhotoCarousel({ isDark }: PhotoCarouselProps) {
  const [photos, setPhotos] = useState(defaultPhotos);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadExamplePhotos = async () => {
      try {
        const response = await fetch('/api/examples');
        const examplePhotos = await response.json();
        if (examplePhotos && examplePhotos.length > 0) {
          setPhotos(examplePhotos);
        }
      } catch (error) {
        console.log('Using default photos');
      }
    };

    loadExamplePhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const next = () => setCurrentIndex((i) => (i + 1) % photos.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);

  const getPhotoIndex = (offset: number) => {
    return (currentIndex + offset + photos.length) % photos.length;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-96 overflow-hidden">
      <div className="flex items-center justify-center gap-4 h-full">
        {/* Previous Photo */}
        <div className="relative w-1/4 h-80 opacity-50 transform scale-90 transition-all duration-500">
          <img
            src={photos[getPhotoIndex(-1)].url}
            alt="Previous"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Current Photo */}
        <div className="relative w-1/2 h-96 z-10 transform scale-100 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-xl" />
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].style}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
            <h3 className="text-2xl font-bold">{photos[currentIndex].style}</h3>
          </div>
        </div>

        {/* Next Photo */}
        <div className="relative w-1/4 h-80 opacity-50 transform scale-90 transition-all duration-500">
          <img
            src={photos[getPhotoIndex(1)].url}
            alt="Next"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-20"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}