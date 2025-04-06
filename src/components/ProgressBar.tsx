import React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  return (
    <Progress.Root
      className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2"
      value={value}
      max={max}
    >
      <Progress.Indicator
        className="bg-indigo-600 w-full h-full transition-transform duration-500 ease-out"
      />
    </Progress.Root>
  );
};

export default ProgressBar;