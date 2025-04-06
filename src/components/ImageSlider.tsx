import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?auto=format&fit=crop&w=1920',
  'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1920',
  'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?auto=format&fit=crop&w=1920'
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden bg-gray-900">
      {images.map((image, index) => (
        <div
          key={image}
          className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(${(index - currentImage) * 100}%)`,
          }}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Learn Korean Today</h1>
          <p className="text-xl">Master the Korean alphabet and language with our interactive lessons</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;