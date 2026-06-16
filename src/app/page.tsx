"use client";
import React, { useState } from 'react';
import { InterviewSetupForm } from '@/components/interview/InterviewSetupForm';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { NextQuestionButton } from '@/components/interview/NextQuestionButton';
import { generateQuestions } from '@/services/interview';

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (domain: string, difficulty: string, resume: File | null, jobDesc: string) => {
    setIsLoading(true);
    // Simulate API call using our service (you could pass resume and jobDesc here in the future)
    const generated = await generateQuestions(domain, difficulty);
    
    // Fallback if not implemented yet
    const dummyQuestions = generated.length > 0 ? generated : [
      `Based on your resume, how would you optimize a slow-loading ${domain} application?`,
      `The job description mentions scaling. Explain a complex technical scaling concept you recently learned.`,
      `What are the most common pitfalls you face at a ${difficulty} level?`
    ];
    setQuestions(dummyQuestions);
    setIsStarted(true);
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("Interview Completed! Proceeding to AI Evaluation...");
      // Route to Candidate 3's Score page eventually
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-wide text-white">AI Interview<span className="text-indigo-400">Portal</span></span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        
        {!isStarted ? (
          <div className="w-full flex flex-col items-center animate-fade-in-up">
            <div className="text-center max-w-2xl mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Interviewer</span>
              </h1>
              <p className="text-lg text-slate-400 font-light">
                Upload your resume and the target job description. Our AI will generate a tailored mock interview just for you.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center bg-[#131B2F]/80 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Analyzing Profile & Generating Questions...</p>
              </div>
            ) : (
              <InterviewSetupForm onStart={handleStart} />
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center space-y-10 animate-fade-in">
            {/* Note: I'll need to update QuestionCard to fit the dark theme */}
            <QuestionCard 
              question={questions[currentIndex]} 
              questionNumber={currentIndex + 1} 
              totalQuestions={questions.length} 
            />
            
            {/* Candidate 2 Placeholder */}
            <div className="w-full bg-[#131B2F] p-12 rounded-3xl shadow-xl border border-white/5 text-center text-slate-400 font-medium text-lg relative overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <span className="relative z-10 text-indigo-300/70">[ Candidate 2: AI Evaluation Module (Answer Input) goes here ]</span>
            </div>

            <div className="w-full flex justify-end">
              <NextQuestionButton 
                onClick={handleNext} 
                isLast={currentIndex === questions.length - 1} 
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
