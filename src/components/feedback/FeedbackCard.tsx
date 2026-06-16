"use client";
import React from 'react';
import { FeedbackSuggestion } from '@/services/feedback';

interface FeedbackCardProps {
  strengths: string[];
  improvements: string[];
  suggestions: FeedbackSuggestion[];
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ strengths, improvements, suggestions }) => {
  return (
    <div className="w-full space-y-8 animate-fade-in-up">
      
      {/* Strengths & Improvements Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Key Strengths */}
        <div className="bg-[#131B2F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl hover:border-indigo-500/10 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full transition-all group-hover:bg-emerald-500/10"></div>
          
          <div className="flex items-center space-x-3 pb-4 border-b border-white/10 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-wide">Key Strengths</h4>
              <p className="text-xs text-slate-400 font-medium">Areas where you excelled during the interview.</p>
            </div>
          </div>

          <ul className="space-y-4">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-3 text-sm text-slate-300 font-medium leading-relaxed">
                <span className="text-emerald-400 font-bold bg-emerald-500/10 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-500/20">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-[#131B2F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl hover:border-indigo-500/10 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full transition-all group-hover:bg-amber-500/10"></div>
          
          <div className="flex items-center space-x-3 pb-4 border-b border-white/10 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-wide">Areas for Improvement</h4>
              <p className="text-xs text-slate-400 font-medium">Critical growth opportunities identified by the AI.</p>
            </div>
          </div>

          <ul className="space-y-4">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-3 text-sm text-slate-300 font-medium leading-relaxed">
                <span className="text-amber-400 font-bold bg-amber-500/10 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 border border-amber-500/20">!</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Development Roadmap */}
      {suggestions.length > 0 && (
        <div className="bg-[#131B2F]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-1/4 -mt-20 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full"></div>
          
          <div className="flex items-center space-x-3 pb-5 border-b border-white/10 mb-8 relative z-10">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A2 2 0 013 15.485V7.892a2 2 0 011.553-1.954l5.447-1.362a2 2 0 011.002 0l5.447 1.362A2 2 0 0118 7.892v7.593a2 2 0 01-1.553 1.954L11 20a2 2 0 01-2 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">Actionable Growth Roadmap</h3>
              <p className="text-xs text-slate-400 font-medium">Personalized strategies and templates to level up your interview performance.</p>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-300 flex flex-col md:flex-row md:items-start gap-6 group/card"
              >
                {/* Category Pin */}
                <div className="md:w-48 shrink-0 flex items-center md:flex-col md:items-start gap-3">
                  <span className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-xl border border-indigo-500/20 text-xs font-bold uppercase tracking-wider block text-center md:w-full">
                    {suggestion.category}
                  </span>
                  <div className="hidden md:block w-full h-px bg-white/5 mt-3"></div>
                </div>

                {/* Growth Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">Observation</h5>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{suggestion.description}</p>
                  </div>
                  
                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 space-y-2">
                    <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span>Actionable Next Step</span>
                    </div>
                    <p className="text-slate-200 text-xs font-medium leading-relaxed">{suggestion.actionableStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
