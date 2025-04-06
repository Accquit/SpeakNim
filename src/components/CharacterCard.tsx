import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { Volume2, Info } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface CharacterCardProps {
  character: string;
  romanization: string;
  ipa: string;
  sound: string;
  audioUrl: string;
  strokeOrder: string[];
  exampleWord: {
    word: string;
    meaning: string;
    pronunciation: string;
  };
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  romanization,
  ipa,
  sound,
  audioUrl,
  strokeOrder,
  exampleWord,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [play] = useSound(audioUrl);
  const [currentStroke, setCurrentStroke] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-7xl font-bold text-indigo-600">{character}</span>
          <button
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            onClick={() => play()}
          >
            <Volume2 className="w-6 h-6 text-indigo-600" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Romanization</p>
            <p className="text-lg font-medium">{romanization}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">IPA</p>
            <p className="text-lg font-medium font-mono">{ipa}</p>
          </div>

          <div className="border-t pt-3">
            <p className="text-sm text-gray-500 mb-1">Example Word</p>
            <div className="bg-indigo-50 rounded-lg p-3">
              <p className="text-lg font-bold">{exampleWord.word}</p>
              <p className="text-sm text-gray-600">{exampleWord.pronunciation}</p>
              <p className="text-sm text-gray-600">{exampleWord.meaning}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t">
        <p className="text-sm font-medium text-gray-700 mb-2">Stroke Order</p>
        <div className="flex space-x-2">
          {strokeOrder.map((stroke, index) => (
            <Tooltip.Provider key={index}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    className={`w-8 h-8 rounded ${
                      index === currentStroke
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setCurrentStroke(index)}
                  >
                    {index + 1}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white p-2 rounded-lg shadow-lg border"
                    sideOffset={5}
                  >
                    <img
                      src={stroke}
                      alt={`Stroke ${index + 1}`}
                      className="w-32 h-32"
                    />
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;