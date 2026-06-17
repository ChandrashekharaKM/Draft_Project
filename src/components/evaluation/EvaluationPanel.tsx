"use client";
import React from 'react';
import { EvaluationResult } from '@/services/evaluation';

interface EvaluationPanelProps {
  evaluation: EvaluationResult;
}

export const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation }) => {
  const { score, relevance, communication, technicalAccuracy, strengths, improvements } = evaluation;

  // Calculate SVG circle properties for overall score
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Function to get score rating text and class
  const getRating = (val: number) => {
    if (val >= 85) return { text: "Outstanding", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (val >= 70) return { text: "Good Progress", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
    return { text: "Needs Attention", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
  };

  const rating = getRating(score);

  return (
    <div className="w-full bg-[#131B2F]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Visual background lights */}
      <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wide">AI Evaluation Report</h3>
            <p className="text-sm text-slate-400 mt-1">Real-time analysis of your response metrics and qualitative feedback.</p>
          </div>
          <span className={`px-4 py-2 rounded-full border ${rating.bg} ${rating.color} ${rating.border} text-sm font-extrabold tracking-wider uppercase`}>
            {rating.text}
          </span>
        </div>

        {/* Scores Overview Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Radial overall score gauge */}
          <div className="flex flex-col items-center justify-center bg-white/2 p-6 rounded-2xl border border-white/5 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Overall Score</span>
            
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* SVG Radial Progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Track */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  className="stroke-white/5" 
                  strokeWidth="8"
                  fill="transparent" 
                />
                {/* Active Progress */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  className="stroke-indigo-500 transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              {/* Score Value Overlay */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white font-mono leading-none">{score}</span>
                <span className="text-xs font-semibold text-slate-400 mt-1">/ 100</span>
              </div>
            </div>
          </div>

          {/* Sub-scores (Relevance, Communication, Technical Accuracy) */}
          <div className="md:col-span-2 space-y-5 bg-white/2 p-6 rounded-2xl border border-white/5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Performance Details</span>
            
            {/* Relevance Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Relevance</span>
                <span className="text-emerald-400 font-mono">{relevance}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${relevance}%` }}
                ></div>
              </div>
            </div>

            {/* Communication Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Communication</span>
                <span className="text-purple-400 font-mono">{communication}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${communication}%` }}
                ></div>
              </div>
            </div>

            {/* Technical Accuracy Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Technical Accuracy</span>
                <span className="text-sky-400 font-mono">{technicalAccuracy}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-sky-500 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${technicalAccuracy}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>

        {/* Qualitative Insights Section (Strengths / Improvements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Strengths */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-emerald-500/10">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white tracking-wide">Key Strengths</h4>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300 font-medium leading-relaxed">
                  <span className="text-emerald-400 mt-1 shrink-0">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-amber-500/10">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white tracking-wide">Areas for Improvement</h4>
            </div>
            <ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300 font-medium leading-relaxed">
                  <span className="text-amber-400 mt-1 shrink-0">⚠</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
