// src/components/game/ComplimentsList.tsx

import React from 'react';
import type { Compliment } from './types';

interface ComplimentsListProps {
  compliments: Compliment[];
}

export const ComplimentsList: React.FC<ComplimentsListProps> = ({ compliments }) => {
  return (
    <div className="flex flex-col space-y-4">
      {compliments.map((compliment, index) => (
        <div 
          key={index}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <p className="text-center">{compliment.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplimentsList;