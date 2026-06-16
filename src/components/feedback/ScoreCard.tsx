"use client";
import React, { useEffect, useState } from 'react';

interface ScoreCardProps {
  score: number;
  domain: string;
  difficulty: string;
  questionsCount: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, domain, difficulty, questionsCount }) => {
  const [animatedOffset, setAnimatedOffset] = useState(314.16); // Start full (0 score)
  
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      const targetOffset = circumference - (score / 100) * circumference;
      setAnimatedOffset(targetOffset);
    }, 150);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getTier = (val: number) => {
    if (val >= 90) {
      return { 
        name: "Elite Performance", 
        color: "text-emerald-400", 
        bg: "bg-emerald-500/10", 
        border: "border-emerald-500/20",
        glow: "shadow-emerald-500/20",
        message: "Exceptional responses. You demonstrate deep technical insight and robust explanation structures."
      };
    }
    if (val >= 80) {
      return { 
        name: "Strong Candidate", 
        color: "text-indigo-400", 
        bg: "bg-indigo-500/10", 
        border: "border-indigo-500/20",
        glow: "shadow-indigo-500/20",
        message: "Great work! You have solid foundations and communicate details effectively."
      };
    }
    if (val >= 70) {
      return { 
        name: "Growing Professional", 
        color: "text-sky-400", 
        bg: "bg-sky-500/10", 
        border: "border-sky-500/20",
        glow: "shadow-sky-500/20",
        message: "Good effort. Focusing on providing more concrete examples and terminology will boost your score."
      };
    }
    return { 
      name: "Needs Practice", 
      color: "text-amber-400", 
      bg: "bg-amber-500/10", 
      border: "border-amber-500/20",
      glow: "shadow-amber-500/20",
      message: "Keep practicing! Review core domain methodologies and focus on structural clarity."
    };
  };

  const tier = getTier(score);

  return (
    <div className="w-full bg-[#131B2F]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full group hover:border-indigo-500/20 transition-all duration-300">
      {/* Absolute decorative glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full transition-all group-hover:bg-indigo-500/20"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Interview Performance</span>
          <h2 className="text-2xl font-bold text-white tracking-wide">Overall Report</h2>
        </div>

        {/* Big Circular Progress */}
        <div className="relative flex items-center justify-center w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Defs for gradients */}
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <stop offset="0%" stopColor="#6366f1" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Circle */}
            <circle 
              cx="60" 
              cy="60" 
              r={radius} 
              className="stroke-white/5" 
              strokeWidth="7"
              fill="transparent" 
            />

            {/* Animated Score Progress Circle */}
            <circle 
              cx="60" 
              cy="60" 
              r={radius} 
              stroke="url(#scoreGrad)"
              strokeWidth="7" 
              strokeDasharray={circumference} 
              strokeDashoffset={animatedOffset} 
              strokeLinecap="round" 
              fill="transparent" 
              className="transition-all duration-1000 ease-out"
              style={{ filter: "drop-shadow(0px 0px 4px rgba(99, 102, 241, 0.4))" }}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold text-white tracking-tighter font-mono">{score}</span>
            <span className="text-sm font-semibold text-slate-400 mt-1">/ 100</span>
          </div>
        </div>

        {/* Tier Indicator */}
        <div className="space-y-2">
          <span className={`px-5 py-2 rounded-full border ${tier.bg} ${tier.color} ${tier.border} text-xs font-extrabold tracking-widest uppercase inline-block shadow-md ${tier.glow}`}>
            {tier.name}
          </span>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium mt-3">
            {tier.message}
          </p>
        </div>
      </div>

      {/* Metadata footer */}
      <div className="border-t border-white/5 pt-6 mt-6 grid grid-cols-3 gap-2 text-center text-xs relative z-10 font-semibold text-slate-400">
        <div className="bg-white/2 rounded-xl py-2 px-1 border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Domain</div>
          <div className="text-white truncate px-1" title={domain}>{domain || "General"}</div>
        </div>
        <div className="bg-white/2 rounded-xl py-2 px-1 border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Difficulty</div>
          <div className="text-white capitalize">{difficulty || "Standard"}</div>
        </div>
        <div className="bg-white/2 rounded-xl py-2 px-1 border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Questions</div>
          <div className="text-white font-mono">{questionsCount}</div>
        </div>
      </div>
    </div>
  );
};
