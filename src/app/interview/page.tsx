"use client";
import React, { useState } from 'react';
import { CategorySelector } from '@/components/interview/CategorySelector';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { NextQuestionButton } from '@/components/interview/NextQuestionButton';
import { generateQuestions } from '@/services/interview';

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (domain: string, difficulty: string) => {
    setIsLoading(true);
    // Simulate API call using our service
    const generated = await generateQuestions(domain, difficulty);
    // Fallback if not implemented yet
    const dummyQuestions = generated.length > 0 ? generated : [
      `How would you optimize a slow-loading ${domain} application?`,
      `Explain a complex technical concept you recently learned in ${domain}.`,
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
      // In reality, we'd route to evaluation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      
      {!isStarted ? (
        <div className="w-full flex justify-center transition-all duration-700 transform translate-y-0 opacity-100">
          {isLoading ? (
            <div className="flex flex-col items-center bg-white p-12 rounded-3xl shadow-2xl">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mb-6"></div>
              <p className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Generating AI Questions...</p>
            </div>
          ) : (
            <CategorySelector onSelect={handleStart} />
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center space-y-10 transition-all duration-700 opacity-100">
          <QuestionCard 
            question={questions[currentIndex]} 
            questionNumber={currentIndex + 1} 
            totalQuestions={questions.length} 
          />
          
          {/* Candidate 2's AnswerInput will go here eventually */}
          <div className="w-full bg-white p-12 rounded-3xl shadow-md border-2 border-dashed border-gray-300 text-center text-gray-400 font-medium text-lg relative overflow-hidden group">
             <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <span className="relative z-10">[ Candidate 2: AI Evaluation Module (Answer Input) goes here ]</span>
          </div>

          <div className="w-full flex justify-end">
            <NextQuestionButton 
              onClick={handleNext} 
              isLast={currentIndex === questions.length - 1} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
