import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface FlashCardProps {
  character: string;
  romanization: string;
  sound: string;
  audioUrl: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ character, romanization, sound, audioUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [play] = useSound(audioUrl);

  return (
    <div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-7xl font-bold text-indigo-600 mb-4">{character}</span>
            <button
              className="mt-4 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                play();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="absolute w-full h-full bg-indigo-600 rounded-xl shadow-lg p-6 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white">
            <p className="text-2xl font-bold mb-2">{romanization}</p>
            <p className="text-lg">{sound}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlashCard;