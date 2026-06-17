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
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-emerald-500/20' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20'
      }`}
    >
      {isLast ? 'Finish Interview 🎉' : 'Next Question ➔'}
    </button>
  );
};
