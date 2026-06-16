"use client";
import React from 'react';

interface NextQuestionButtonProps {
  onClick: () => void;
  isLast: boolean;
}

export const NextQuestionButton: React.FC<NextQuestionButtonProps> = ({ onClick, isLast }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-10 py-4 rounded-2xl font-extrabold text-lg transition-all duration-300 shadow-xl transform hover:-translate-y-1 ${
        isLast 
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
      }`}
    >
      {isLast ? 'Finish Interview 🎉' : 'Next Question ➔'}
    </button>
  );
};
