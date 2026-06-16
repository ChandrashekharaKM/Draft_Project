"use client";
import React from 'react';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, totalQuestions }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-3xl border-l-8 border-blue-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
      </div>
      <div className="flex justify-between items-center mb-8 relative z-10">
        <span className="text-sm font-extrabold text-blue-600 tracking-widest uppercase bg-blue-50 px-4 py-2 rounded-full">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></span>
        </span>
      </div>
      <h3 className="text-3xl font-semibold text-gray-800 leading-snug relative z-10">{question}</h3>
      <div className="mt-10 border-t border-gray-100 pt-6 relative z-10">
        <p className="text-sm text-gray-500 italic font-medium">💡 Think out loud and articulate your thoughts clearly.</p>
      </div>
    </div>
  );
};
