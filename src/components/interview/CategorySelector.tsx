"use client";
import React from 'react';

interface CategorySelectorProps {
  onSelect: (domain: string, difficulty: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  const [domain, setDomain] = React.useState('Frontend');
  const [difficulty, setDifficulty] = React.useState('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelect(domain, difficulty);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 backdrop-blur-sm bg-white/90">
      <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-center">Start Mock Interview</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Domain</label>
          <select 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:ring-0 focus:border-blue-500 transition-colors text-gray-800 bg-gray-50 font-medium"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
            <option>DevOps</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Difficulty</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:ring-0 focus:border-blue-500 transition-colors text-gray-800 bg-gray-50 font-medium"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
        >
          Generate Questions ✨
        </button>
      </form>
    </div>
  );
};
